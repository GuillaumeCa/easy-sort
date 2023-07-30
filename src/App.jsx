import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import Fetch from "i18next-fetch-backend";
import React, { Suspense } from "react";
import { initReactI18next } from "react-i18next";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Account from "./Account";
import AuthProvider from "./AuthProvider";
import { Footer } from "./Footer";
import Header from "./Header";
import { ListCreator } from "./ListCreator";
import { MyLists } from "./MyLists";
import ViewList from "./ViewList";
import "./alert-dialog.style.css";
import "./firebase";
import "./styles.css";

i18next
  .use(detector)
  .use(Fetch)
  .use(initReactI18next)
  .init({
    ns: ["common", "account", "create-list", "view-list", "menu"],
    backend: {
      loadPath: "/locale/{{lng}}/{{ns}}.json",
    },
    defaultNS: "common",
    fallbackLng: "en",
  });

export default function App() {
  return (
    <div className="App theme">
      <Router>
        <AuthProvider>
          <div className="container">
            <Suspense fallback={null}>
              <Header />
              <main style={{ marginTop: 30 }}>
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

              <Footer />
            </Suspense>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}
