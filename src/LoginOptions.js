import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import firebase from "./firebase";

export default function LoginOptions({ onLogin }) {
  const { t } = useTranslation();
  async function loginGoogle() {
    onLogin();

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope("email");
    try {
      await firebase.auth().signInWithPopup(googleProvider);
    } catch (err) {
      firebase.analytics().logEvent("loginError", { error: err });
      alert(t("Could not login"));
    }
  }

  async function loginTwitter() {
    onLogin();

    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    twitterProvider.addScope("email");
    try {
      await firebase.auth().signInWithPopup(twitterProvider);
    } catch (err) {
      firebase.analytics().logEvent("loginError", { error: err });
      alert(t("Could not login"));
    }
  }

  return (
    <>
      <button className="btn bold login-google" onClick={loginGoogle}>
        <span className="rspacer">{t("Sign in with")}</span>
        <FontAwesomeIcon icon={faGoogle} />
      </button>
      {/* <button className="btn bold login-twitter lspacer">
        <span className="rspacer">{t("Sign in with")}</span>
        <FontAwesomeIcon icon={faTwitter} onClick={loginTwitter} />
      </button> */}
    </>
  );
}
