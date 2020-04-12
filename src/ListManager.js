import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export function ListManager({ list, setList, onReadOnly, readOnly }) {
  const { t } = useTranslation();
  const [itemToAdd, setItemToAdd] = useState("");

  function copyToClipboard(list) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(list.join("\n"));
      alert(t("List copied to clipboard"));
      return;
    }
    alert(t("Unable to copy to clipboard"));
  }

  function addToList(e) {
    e.preventDefault();
    if (itemToAdd === "") {
      return;
    }

    if (list.find((item) => item === itemToAdd)) {
      alert(t("This element is already present in the list"));
      return;
    }

    setList([...list, itemToAdd]);
    setItemToAdd("");
  }

  function handleInputPaste(e) {
    const value = e.clipboardData.getData("text/plain");
    const multiLines = Array.from(new Set(value.split("\n").filter(Boolean)));
    if (multiLines.length > 1) {
      setList([...list, ...multiLines]);
      e.preventDefault();
    }
  }

  function clearList() {
    setList([]);
  }

  return (
    <>
      {!readOnly && list.length > 0 && (
        <button className="btn vspacer" onClick={clearList}>
          {t("Reset")}
        </button>
      )}
      <ol>
        {list.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
        {!readOnly && (
          <li>
            <form className="vspacer" onSubmit={addToList}>
              <input
                className="form-input"
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
