import {
  faClipboard,
  faCloud,
  faPen,
  faTrash,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { v4 as uuidV4 } from "uuid";
import firebase from "./firebase";
import LoginOptions from "./LoginOptions";

function useDerivedState(baseState, deps = [baseState]) {
  const [state, setState] = useState(baseState);
  useEffect(() => {
    setState(baseState);
  }, deps);

  return [state, setState];
}

function ListActions({ onSave, list, onExit, clear, readOnly, onChoose }) {
  const { t } = useTranslation();
  const [user, initializing, error] = useAuthState(firebase.auth());

  const isNotLoggedIn = !user && !initializing && !error;
  const isSorted = list.items.filter((item) => item.rank > 0).length > 0;

  function copyToClipboard(list) {
    if (navigator.clipboard) {
      const text = [list.title, ...list.items].join("\n");
      navigator.clipboard.writeText(text);
      setTimeout(() => {
        alert(t("List copied to clipboard"));
      }, 100);
      return;
    }
    alert(t("Unable to copy to clipboard"));
  }

  return (
    <>
      <div>
        {!readOnly && list.items.length > 0 && (
          <>
            <button className="btn vspacer" onClick={clear}>
              <FontAwesomeIcon icon={faUndo} /> {t("Reset")}
            </button>

            {onSave && isSorted && !isNotLoggedIn && (
              <button
                className="btn btn-primary lspacer"
                onClick={() => onSave(list)}
              >
                <FontAwesomeIcon icon={faCloud} /> {t("Save")}
              </button>
            )}

            {list.items.length >= 2 && (
              <button className="btn btn-primary lspacer" onClick={onChoose}>
                {t("Sort")} &rarr;
              </button>
            )}
          </>
        )}

        {readOnly && (
          <>
            {onSave && !isNotLoggedIn && (
              <button
                className="btn btn-primary vspacer"
                onClick={() => onSave(list)}
              >
                <FontAwesomeIcon icon={faCloud} /> {t("Save")}
              </button>
            )}
            <button
              className="btn lspacer"
              onClick={() => copyToClipboard(list)}
            >
              <FontAwesomeIcon icon={faClipboard} /> {t("Copy the list")}
            </button>
            {onExit && (
              <button className="btn btn-primary lspacer" onClick={onExit}>
                <FontAwesomeIcon icon={faPen} /> {t("Edit the list")}
              </button>
            )}
          </>
        )}
      </div>
      {isNotLoggedIn && (
        <div>
          <hr />
          <p>To save this list, you have to be logged in.</p>
          <LoginOptions />
        </div>
      )}
    </>
  );
}

function ListItem({ item, readOnly, onEdit, onDelete }) {
  const [itemName, setItemName] = useDerivedState(item.name);
  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {!readOnly && (
          <input
            disabled={readOnly}
            className="form-input-ninja"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onBlur={() => {
              onEdit({
                ...item,
                name: itemName,
              });
            }}
          />
        )}
        {readOnly && <span>{item.name}</span>}
        {!readOnly && (
          <FontAwesomeIcon
            className="lspacer text-gray"
            icon={faTrash}
            cursor="pointer"
            onClick={onDelete}
          />
        )}
      </div>
    </div>
  );
}

function sortByRank(itemA, itemB) {
  return itemB.rank - itemA.rank;
}

export function ListEditor({
  list,
  addItems,
  setTitle,
  clear,
  removeItem,
  editItem,
  readOnly,
  onExit,
  onSave,
  onChoose,
}) {
  const { t } = useTranslation();
  const [itemToAdd, setItemToAdd] = useState("");

  function addToList(e) {
    e.preventDefault();
    if (itemToAdd === "") {
      return;
    }

    if (list.items.find((item) => item.name === itemToAdd)) {
      alert(t("This element is already present in the list"));
      return;
    }

    addItems([createItem(itemToAdd)]);
    setItemToAdd("");
  }

  function handleInputPaste(e) {
    const value = e.clipboardData.getData("text/plain");
    const multiLines = Array.from(new Set(value.split("\n").filter(Boolean)));
    if (multiLines.length > 1) {
      addItems(multiLines.map((name) => createItem(name)));
      e.preventDefault();
    }
  }

  function createItem(name) {
    return {
      id: uuidV4(),
      name,
      rank: 0,
    };
  }

  return (
    <>
      <h2>
        {!readOnly && (
          <input
            disabled={readOnly}
            className="form-input-ninja bold"
            placeholder={t("title-placeholder")}
            value={list.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
        {readOnly && <span>{list.title}</span>}
      </h2>

      <ol style={{ maxWidth: 400 }}>
        {list.items.sort(sortByRank).map((item) => (
          <li className="vspacer" key={item.id}>
            <ListItem
              item={item}
              readOnly={readOnly}
              onEdit={editItem}
              onDelete={() => removeItem(item.id)}
            />
          </li>
        ))}
        {!readOnly && (
          <li>
            <form className="vspacer" onSubmit={addToList}>
              <input
                className="form-input-ninja"
                placeholder={t("Name")}
                value={itemToAdd}
                onPaste={handleInputPaste}
                onChange={(e) => setItemToAdd(e.target.value)}
              />
              <p className="caption">
                {t("Hit Enter to add to list")} <br />
                {t("Add many item")}
              </p>
            </form>
          </li>
        )}
      </ol>

      <ListActions
        list={list}
        readOnly={readOnly}
        clear={clear}
        onSave={onSave}
        onExit={onExit}
        onChoose={onChoose}
      />
    </>
  );
}
