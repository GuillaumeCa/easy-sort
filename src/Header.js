import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUser } from "./AuthProvider";
import ErrorMessage from "./ErrorMessage";
import firebase from "./firebase";
import { Menu } from "./Menu";

export default function Header() {
  const { t } = useTranslation();
  const { user, initialising, error } = useUser();

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
        </div>
      </div>
      <Menu />
    </>
  );
}
