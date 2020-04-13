import { faList, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export function Menu() {
  const { t } = useTranslation();

  return (
    <div className="vspacer">
      <div className="rounded-full nav">
        <NavLink className="link bold" activeClassName="active" exact to="/">
          <FontAwesomeIcon icon={faPlusCircle} />
          <span className="lspacer">{t("New list")}</span>
        </NavLink>
        <NavLink
          className="link bold"
          activeClassName="active"
          exact
          to="/mylists"
        >
          <FontAwesomeIcon icon={faList} />
          <span className="lspacer">{t("My lists")}</span>
        </NavLink>
      </div>
    </div>
  );
}
