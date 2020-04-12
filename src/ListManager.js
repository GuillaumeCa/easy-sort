import React, { useState } from "react";

function copyToClipboard(list) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(list.join("\n"));
    alert("La liste ordonnée a été copiée dans votre presse papier");
    return;
  }
  alert("Impossible de copier la liste, essayez un navigateur plus récent");
}

export function ListManager({ list, setList, onReadOnly, readOnly }) {
  const [itemToAdd, setItemToAdd] = useState("");

  function addToList(e) {
    e.preventDefault();
    if (itemToAdd === "") {
      return;
    }

    if (list.find(item => item === itemToAdd)) {
      alert("Cet élément est déjà présent dans la liste");
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
          Réinitialiser
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
                placeholder="Nom"
                value={itemToAdd}
                onPaste={handleInputPaste}
                onChange={e => setItemToAdd(e.target.value)}
              />
              <p className="caption">
                Appuyez sur Entrée pour ajouter à la liste. <br />
                Ajoutez plusieurs éléments en même temps en collant une liste
                séparée par des retour à la ligne dans le champ texte ci-dessus.
              </p>
            </form>
          </li>
        )}
      </ol>
      {readOnly && (
        <button className="btn vspacer" onClick={() => copyToClipboard(list)}>
          &darr; Copier la liste
        </button>
      )}
      {readOnly && (
        <button
          className="btn btn-primary hspacer"
          onClick={() => onReadOnly(false)}
        >
          Modifier la liste &rarr;
        </button>
      )}
    </>
  );
}
