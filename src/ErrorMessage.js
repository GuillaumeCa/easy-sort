import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ErrorMessage({ children }) {
  return (
    <p>
      <FontAwesomeIcon icon={faExclamationTriangle} />
      <span className="lspacer">{children}</span>
    </p>
  );
}
