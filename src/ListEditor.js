import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidV4 } from "uuid";

function useDerivedState(baseState, deps = [baseState]) {
  const [state, setState] = useState(baseState);
  useEffect(() => {
    setState(baseState);
  }, deps);

  return [state, setState];
}

function ListItem({ item, readOnly, onEdit, onDelete }) {
  const [itemName, setItemName] = useDerivedState(item.name);
  return (
    <>
      <input
        disabled={readOnly}
        className="form-input-ninja"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        onBlur={(e) => {
          onEdit({
            id: item.id,
            name: itemName,
          });
        }}
      />
      <FontAwesomeIcon icon={faTrash} cursor="pointer" onClick={onDelete} />
    </>
  );
}

export function ListEditor({
  list,
  addItems,
  setTitle,
  clearItems,
  removeItem,
  editItem,
  onReadOnly,
  readOnly,
}) {
  const { t } = useTranslation();
  const [itemToAdd, setItemToAdd] = useState("");

  function copyToClipboard(list) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(list.items.join("\n"));
      setTimeout(() => {
        alert(t("List copied to clipboard"));
      }, 100);
      return;
    }
    alert(t("Unable to copy to clipboard"));
  }

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
    };
  }

  return (
    <>
      <h2>
        <input
          disabled={readOnly}
          className="form-input-ninja bold"
          placeholder={t("Click me to edit the title")}
          value={list.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </h2>

      <ol style={{ maxWidth: 400 }}>
        {list.items.map((item) => (
          <li className="vspacer" key={item.id}>
            <ListItem
              item={item}
              readOnly={readOnly}
              onEdit={editItem}
              onDelete={() => removeItem(item)}
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
      {!readOnly && list.items.length > 0 && (
        <button className="btn hspacer" onClick={clearItems}>
          {t("Reset")}
        </button>
      )}
      {readOnly && (
        <>
          <button className="btn vspacer" onClick={() => copyToClipboard(list)}>
            &darr; {t("Copy the list")}
          </button>
          <button
            className="btn btn-primary hspacer"
            onClick={() => onReadOnly(false)}
          >
            {t("Edit the list")} &rarr;
          </button>
        </>
      )}
    </>
  );
}
