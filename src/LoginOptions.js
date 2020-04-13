import { faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import firebase from "./firebase";

export default function LoginOptions() {
  async function loginGoogle() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope("email");
    try {
      await firebase.auth().signInWithPopup(googleProvider);
    } catch (err) {
      firebase.analytics().logEvent("loginError", { error: err });
      alert("Could not login");
    }
  }

  async function loginTwitter() {
    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    twitterProvider.addScope("email");
    try {
      await firebase.auth().signInWithPopup(twitterProvider);
    } catch (err) {
      firebase.analytics().logEvent("loginError", { error: err });
      alert("Could not login");
    }
  }

  return (
    <>
      <button className="btn bold login-google" onClick={loginGoogle}>
        Sign in with <FontAwesomeIcon icon={faGoogle} />
      </button>
      <button className="btn bold login-twitter lspacer">
        Sign in with <FontAwesomeIcon icon={faTwitter} onClick={loginTwitter} />
      </button>
    </>
  );
}
