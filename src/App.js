import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import React, { useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { Footer } from "./Footer";
import { ListManager } from "./ListManager";
import { ListSorter } from "./ListSorter";
import "./styles.css";
import { EN_TRANSLATION } from "./translation/en";
import { FR_TRANSLATION } from "./translation/fr";

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: EN_TRANSLATION,
      fr: FR_TRANSLATION,
    },
    fallbackLng: "en",
  });

const MODE_EDIT = "edit";
const MODE_CHOOSE = "choose";
const MODE_RESULT = "result";

export default function App() {
  const { t } = useTranslation();
  const [mode, changeMode] = useState(MODE_EDIT);
  const [list, setList] = useState([]);

  return (
    <div className="App">
      <div className="container">
        <h1>🗄 EasySort</h1>
        <p>{t("Sort your lists easily !")}</p>
        <hr />
        <main>
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
              sortEnded={(listSorted) => {
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
              {t("Sort")} &rarr;
            </button>
          )}
        </main>

        <hr />
        <Footer />
      </div>
    </div>
  );
}
