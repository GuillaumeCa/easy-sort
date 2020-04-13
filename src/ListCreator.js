import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import firebase from "./firebase";
import { ListEditor } from "./ListEditor";
import { ListSorter } from "./ListSorter";
import { useListEditor } from "./useListEditor";

const MODE_EDIT = "edit";
const MODE_CHOOSE = "choose";
const MODE_RESULT = "result";

export function ListCreator() {
  const { t } = useTranslation();
  const history = useHistory();
  const [user, initializing, error] = useAuthState(firebase.auth());
  const isLoggedin = user && !initializing && !error;

  const [mode, changeMode] = useState(MODE_EDIT);
  const {
    list,
    addItems,
    clear,
    editItem,
    removeItem,
    setTitle,
    setItems,
  } = useListEditor();

  function saveList(newList) {
    if (isLoggedin) {
      firebase
        .firestore()
        .collection("lists")
        .add({
          ...newList,
          author: user.uid,
        })
        .then(
          (newDoc) => {
            clear();
            history.push(`/mylists/${newDoc.id}`);
          },
          (err) => alert(t("Save list failed"))
        );
    }
  }

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
          clear={clear}
          onSave={saveList}
          onChoose={() => changeMode(MODE_CHOOSE)}
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
          onSave={saveList}
          onExit={() => changeMode(MODE_EDIT)}
          list={list}
        />
      )}
    </>
  );
}
