import { faSignOutAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogLabel,
} from "@reach/alert-dialog";
import React, { useRef, useState } from "react";
import { useUser } from "./AuthProvider";

export default function Account() {
  const { user, initializing, error } = useUser();
  const cancelRef = useRef();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>Hello, {user.displayName}</h2>

      <button className="btn">
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span className="lspacer">Sign out</span>
      </button>
      <button
        className="btn btn-warn lspacer"
        onClick={() => setConfirmDelete(true)}
      >
        <FontAwesomeIcon icon={faTrash} />
        <span className="lspacer">Delete Account</span>
      </button>

      {confirmDelete && (
        <AlertDialog className="theme" leastDestructiveRef={cancelRef}>
          <AlertDialogLabel>
            <h2>Are you sure you want to delete your account ?</h2>
          </AlertDialogLabel>
          <AlertDialogDescription>
            This action cannot be reversed and all your data will be deleted.
          </AlertDialogDescription>
          <div className="alert-buttons vspacer">
            <button
              className="btn btn-warn"
              onClick={async () => {
                setConfirmDelete(false);
                await user.delete();
              }}
            >
              Yes, delete
            </button>{" "}
            <button
              ref={cancelRef}
              className="btn lspacer"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </div>
        </AlertDialog>
      )}
    </div>
  );
}
