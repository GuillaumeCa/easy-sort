import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import firebase from "./firebase";
import LoginOptions from "./LoginOptions";

function ListItem({ id, title, items, onDelete }) {
  return (
    <div className="card rounded">
      <div>
        <ol>
          {items.slice(0, 3).map((itm) => (
            <li key={itm.id}>{itm.name}</li>
          ))}
          {items.slice(3, 4).length > 0 && <li>...</li>}
        </ol>
      </div>
      <div className="card-footer">
        <Link to={`/mylists/${id}`}>
          <span className="bold">{title}</span>
        </Link>

        <FontAwesomeIcon icon={faTrash} cursor="pointer" onClick={onDelete} />
      </div>
    </div>
  );
}

export function MyLists() {
  const { t } = useTranslation();
  const [user, initializing, authError] = useAuthState(firebase.auth());
  const userId = user && !initializing && !authError ? user.uid : null;
  const query = userId
    ? firebase.firestore().collection("lists").where("author", "==", userId)
    : null;

  const [value, loading, error] = useCollection(query, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (authError || error) {
    return <ErrorMessage>{t("something went wrong")}</ErrorMessage>;
  }

  if (loading || initializing) {
    return <p className="caption">{t("loading")}</p>;
  }

  if (!initializing && !user) {
    return (
      <div>
        <p>{t("sign in to save")}</p>
        <LoginOptions />
      </div>
    );
  }

  if (!value) {
    return null;
  }
  if (value.docs.length === 0) {
    return (
      <div>
        <p>{t("no list saved")}</p>
        <a href="/" className="link active rounded">
          <FontAwesomeIcon icon={faPlusCircle} /> {t("create new list")}
        </a>
      </div>
    );
  }

  return (
    <div className="grid">
      {value.docs.map((doc) => (
        <ListItem
          key={doc.id}
          id={doc.id}
          title={doc.get("title")}
          items={doc.get("items")}
          onDelete={() => doc.ref.delete()}
        />
      ))}
    </div>
  );
}
