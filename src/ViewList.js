import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import firebase from "./firebase";
import { ListEditor } from "./ListEditor";

export default function ViewList() {
  const param = useParams();
  const { t } = useTranslation();
  const [user, initializing, authError] = useAuthState(firebase.auth());

  const userId = user ? user.uid : null;
  const documentQuery = userId
    ? firebase.firestore().doc(`users/${userId}/lists/${param.id}`)
    : null;

  const [value, loading, error] = useDocument(documentQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (error || authError) {
    return <p>{t("something went wrong")}</p>;
  }

  if (loading || initializing) {
    return <p>{t("loading")}</p>;
  }

  if (!value) {
    return null;
  }

  return (
    <div>
      <ListEditor readOnly={true} list={value.data()} />
    </div>
  );
}
