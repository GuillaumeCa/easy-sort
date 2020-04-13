import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ListEditor } from "./ListEditor";
import { ListSorter } from "./ListSorter";
import { useListEditor } from "./useListEditor";

const MODE_EDIT = "edit";
const MODE_CHOOSE = "choose";
const MODE_RESULT = "result";

export function ListCreator() {
  const { t } = useTranslation();
  const [mode, changeMode] = useState(MODE_EDIT);
  const {
    list,
    addItems,
    clearItems,
    editItem,
    removeItem,
    setTitle,
    setItems,
  } = useListEditor();

  return (
    <>
      {mode === MODE_EDIT && (
        <ListEditor
          readOnly={false}
          list={list}
          setTitle={setTitle}
          addItems={addItems}
          editItem={editItem}
          removeItem={removeItem}
          clearItems={clearItems}
        />
      )}
      {mode === MODE_CHOOSE && (
        <ListSorter
          list={list.items}
          onExitSorter={() => changeMode(MODE_EDIT)}
          onSortEnded={(itemsSorted) => {
            setItems(itemsSorted);
            changeMode(MODE_RESULT);
          }}
        />
      )}
      {mode === MODE_RESULT && (
        <ListEditor
          readOnly={true}
          onReadOnly={() => changeMode(MODE_EDIT)}
          list={list}
        />
      )}

      {list.items.length > 0 && mode === MODE_EDIT && (
        <button
          className="btn btn-primary"
          onClick={() => changeMode(MODE_CHOOSE)}
        >
          {t("Sort")} &rarr;
        </button>
      )}
    </>
  );
}
