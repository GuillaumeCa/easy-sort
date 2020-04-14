import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import React from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Account from "./Account";
import "./alert-dialog.style.css";
import AuthProvider from "./AuthProvider";
import "./firebase";
import { Footer } from "./Footer";
import Header from "./Header";
import { ListCreator } from "./ListCreator";
import { MyLists } from "./MyLists";
import "./styles.css";
import { EN_TRANSLATION } from "./translation/en";
import { FR_TRANSLATION } from "./translation/fr";
import ViewList from "./ViewList";
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
        <AuthProvider>
          <div className="container">
            <Header />
            <main>
              <Switch>
                <Route exact path="/">
                  <ListCreator />
                </Route>
                <Route exact path="/mylists">
                  <MyLists />
                </Route>
                <Route path="/mylists/:id">
                  <ViewList />
                </Route>
                <Route path="/account">
                  <Account />
                </Route>
              </Switch>
            </main>

            <hr />
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}
