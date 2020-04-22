import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogLabel,
} from "@reach/alert-dialog";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUser } from "./AuthProvider";
import ErrorMessage from "./ErrorMessage";
import firebase from "./firebase";
import LoginOptions from "./LoginOptions";
import { Menu } from "./Menu";

export default function Header() {
  const { t } = useTranslation();
  const { user, initializing, error } = useUser();
  const cancelRef = useRef();
  const [showLoginOpts, setShowLoginOpts] = useState(false);

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
          {initializing && (
            <FontAwesomeIcon className="text-gray" spin icon={faSpinner} />
          )}
          {user && (
            <Link to="/account">
              <div className="vcenter">
                <span>{user.displayName}</span>
                <img
                  className="rounded-full lspacer"
                  style={{ width: 30 }}
                  alt="profile picture"
                  src={user.photoURL}
                />
              </div>
            </Link>
          )}
          {error && <ErrorMessage>{t("Authentication error")}</ErrorMessage>}
          {user && (
            <button className="btn vspacer" onClick={logout}>
              {t("Sign out")}
            </button>
          )}
          {!user && !initializing && (
            <button
              className="btn btn-primary vspacer"
              onClick={() => setShowLoginOpts(true)}
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="lspacer">{t("Sign in")}</span>
            </button>
          )}
        </div>
      </div>

      {showLoginOpts && (
        <AlertDialog className="theme" leastDestructiveRef={cancelRef}>
          <AlertDialogLabel>
            <h2>{t("Login")}</h2>
          </AlertDialogLabel>
          <AlertDialogDescription>
            <div>
              <p>{t("choose-provider")}</p>
              <LoginOptions onLogin={() => setShowLoginOpts(false)} />
            </div>
          </AlertDialogDescription>
          <div className="alert-buttons vspacer">
            <button
              ref={cancelRef}
              className="btn"
              onClick={() => setShowLoginOpts(false)}
            >
              {t("Cancel")}
            </button>
          </div>
        </AlertDialog>
      )}

      <Menu />
    </>
  );
}
