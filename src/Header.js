import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import ErrorMessage from "./ErrorMessage";
import firebase from "./firebase";
import { Menu } from "./Menu";

export default function Header() {
  const { t } = useTranslation();
  const [user, initialising, error] = useAuthState(firebase.auth());

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>🗄 EasySort</h1>
          <p>{t("Sort your lists easily !")}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          {initialising && (
            <FontAwesomeIcon className="text-gray" spin icon={faSpinner} />
          )}
          {user && (
            <div className="vcenter">
              <span>{user.displayName}</span>
              <img
                className="rounded-full lspacer"
                style={{ width: 30 }}
                alt="profile picture"
                src={user.photoURL}
              />
            </div>
          )}
          {error && <ErrorMessage>Erreur d'authentification</ErrorMessage>}
          {user && (
            <button className="btn vspacer" onClick={logout}>
              Sign out
            </button>
          )}
        </div>
      </div>
      <Menu />
    </>
  );
}
