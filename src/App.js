import React, { useState } from "react";
import { ListManager } from "./ListManager";
import { ListSorter } from "./ListSorter";

import "./styles.css";

const MODE_EDIT = "edit";
const MODE_CHOOSE = "choose";
const MODE_RESULT = "result";

export default function App() {
  const [mode, changeMode] = useState(MODE_EDIT);
  const [list, setList] = useState([]);

  return (
    <div className="App">
      <div className="container">
        <h1>EasySort</h1>
        <p>Ordonnez vos listes facilement !</p>
        <hr />
        {mode === MODE_EDIT && (
          <ListManager
            readOnly={false}
            onReadOnly={() => {}}
            list={list}
            setList={setList}
          />
        )}
        {mode === MODE_CHOOSE && (
          <ListSorter
            list={list}
            onExitSorter={() => changeMode(MODE_EDIT)}
            sortEnded={listSorted => {
              setList(listSorted);
              changeMode(MODE_RESULT);
            }}
          />
        )}
        {mode === MODE_RESULT && (
          <ListManager
            readOnly={true}
            onReadOnly={() => changeMode(MODE_EDIT)}
            list={list}
            setList={setList}
          />
        )}

        {list.length > 0 && mode === MODE_EDIT && (
          <button
            className="btn btn-primary"
            onClick={() => changeMode(MODE_CHOOSE)}
          >
            Ordonner &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
