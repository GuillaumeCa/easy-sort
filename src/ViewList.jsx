import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useUser } from "./AuthProvider";
import { ListEditor } from "./ListEditor";
import { queryOneList } from "./services/lists";

export default function ViewList() {
  const param = useParams();
  const { t } = useTranslation();
  const { user, initializing, error: authError } = useUser();

  const userId = user ? user.uid : null;
  const documentQuery = userId ? queryOneList(userId, param.id) : null;

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
