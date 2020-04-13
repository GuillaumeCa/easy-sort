import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import React from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "./Footer";
import { ListCreator } from "./ListCreator";
import { Menu } from "./Menu";
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

export default function App() {
  const { t } = useTranslation();

  return (
    <div className="App theme">
      <Router>
        <div className="container">
          <h1>🗄 EasySort</h1>
          <p>{t("Sort your lists easily !")}</p>
          <Menu />
          <hr />
          <main>
            <Switch>
              <Route exact path="/">
                <ListCreator />
              </Route>
              <Route path="/mylists">
                <div>My lists</div>
              </Route>
            </Switch>
          </main>

          <hr />
          <Footer />
        </div>
      </Router>
    </div>
  );
}
