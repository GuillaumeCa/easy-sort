import { faSignOutAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogLabel,
} from "@reach/alert-dialog";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "./AuthProvider";
import ErrorMessage from "./ErrorMessage";

export default function Account() {
  const { t } = useTranslation();
  const { user, auth, initializing, error } = useUser();
  const cancelRef = useRef();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (initializing) {
    return <p className="caption">{t("loading")}</p>;
  }

  if (error) {
    return <ErrorMessage>{t("something went wrong")}</ErrorMessage>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>
        {t("account:Hello")}, {user.displayName}
      </h2>
      <p>
        {t("account:Logged in with")} {user.providerData[0].providerId}
      </p>

      <button className="btn">
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span className="lspacer">{t("Sign out")}</span>
      </button>
      <button
        className="btn btn-warn lspacer"
        onClick={() => setConfirmDelete(true)}
      >
        <FontAwesomeIcon icon={faTrash} />
        <span className="lspacer">{t("account:Delete Account")}</span>
      </button>

      {confirmDelete && (
        <AlertDialog className="theme" leastDestructiveRef={cancelRef}>
          <AlertDialogLabel>
            <h2>
              {t("account:Are you sure you want to delete your account ?")}
            </h2>
          </AlertDialogLabel>
          <AlertDialogDescription>
            {t(
              "account:This action cannot be reversed and all your data will be deleted."
            )}
          </AlertDialogDescription>
          <div className="alert-buttons vspacer">
            <button
              className="btn btn-warn"
              onClick={async () => {
                setConfirmDelete(false);
                user.delete().catch((err) => {
                  if (err.code === "auth/requires-recent-login") {
                    window.alert(t("account:Please sign-in and try again."));
                    auth.signOut();
                  }
                });
              }}
            >
              {t("account:Yes, delete")}
            </button>{" "}
            <button
              ref={cancelRef}
              className="btn lspacer"
              onClick={() => setConfirmDelete(false)}
            >
              {t("Cancel")}
            </button>
          </div>
        </AlertDialog>
      )}
    </div>
  );
}
