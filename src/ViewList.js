import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import firebase from "./firebase";
import { ListEditor } from "./ListEditor";

export default function ViewList() {
  const param = useParams();
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`lists/${param.id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (error) {
    return <p>Oops..</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ListEditor readOnly={true} list={value.data()} />
    </div>
  );
}
