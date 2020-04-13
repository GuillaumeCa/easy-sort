import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import firebase from "./firebase";
import { ListEditor } from "./ListEditor";

export default function ViewList() {
  const param = useParams();
  const { t } = useTranslation();
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`lists/${param.id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (error) {
    return <p>{t("something went wrong")}</p>;
  }

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div>
      <ListEditor readOnly={true} list={value.data()} />
    </div>
  );
}
