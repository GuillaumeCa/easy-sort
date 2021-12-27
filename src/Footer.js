import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { i18n } = useTranslation();
  const [language, changeLanguage] = useState(i18n.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <footer className="footer">
      <span>Copyright © 2020 EasySort </span>
      <select
        className="select"
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </footer>
  );
}
