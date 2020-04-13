import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function genChoices(list) {
  const choices = [];
  for (let firstChoice of list) {
    for (let secondChoice of list) {
      if (firstChoice.id !== secondChoice.id) {
        const hasChoiceCombination = choices.some(([fc, sc]) => {
          return (
            (fc.id === firstChoice.id || fc.id === secondChoice.id) &&
            (sc.id === firstChoice.id || sc.id === secondChoice.id)
          );
        });

        if (!hasChoiceCombination) {
          choices.push([firstChoice, secondChoice]);
        }
      }
    }
  }

  return choices;
}

export function ListSorter({ list, onSortEnded, onExitSorter }) {
  const { t } = useTranslation();
  const choices = useMemo(() => shuffle(genChoices(list)), [list]);
  const [currentChoiceIdx, setChoiceIndex] = useState(0);
  const [ranks, setRank] = useState(() =>
    list.map((el) => ({ element: el, rank: 1 }))
  );

  function choose(choice) {
    const newRanks = ranks.map((r) => {
      if (r.element.id === choice.id) {
        r.rank++;
      }
      return r;
    });

    setRank(newRanks);
    next();
  }

  function next() {
    if (currentChoiceIdx + 1 < choices.length) {
      setChoiceIndex((idx) => idx + 1);
    } else {
      onSortEnded(
        list.sort((elA, elB) => {
          const elARank = ranks.find((r) => r.element.id === elA.id).rank;
          const elBRank = ranks.find((r) => r.element.id === elB.id).rank;

          return elBRank - elARank;
        })
      );
    }
  }

  const [firstChoice, secondChoice] = choices[currentChoiceIdx] || [];

  return (
    <>
      <button className="btn" onClick={onExitSorter}>
        &larr; {t("Go Back")}
      </button>
      <h2>
        {currentChoiceIdx + 1}/{choices.length} - {t("Choose your favorite")}
      </h2>
      <div>
        <button
          className="btn btn-primary"
          title={t("click to select")}
          onClick={() => choose(firstChoice)}
        >
          {firstChoice.name}
        </button>
        <span style={{ margin: 10 }}>{t("or")}</span>
        <button
          className="btn btn-primary"
          title={t("click to select")}
          onClick={() => choose(secondChoice)}
        >
          {secondChoice.name}
        </button>
        <span style={{ margin: 10 }}>?</span>
      </div>
    </>
  );
}
