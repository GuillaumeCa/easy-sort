import React, { useState, useMemo } from "react";

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
      if (firstChoice !== secondChoice) {
        const hasChoiceCombination = choices.some(([fc, sc]) => {
          return (
            (fc === firstChoice || fc === secondChoice) &&
            (sc === firstChoice || sc === secondChoice)
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

export function ListSorter({ list, sortEnded, onExitSorter }) {
  const choices = useMemo(() => shuffle(genChoices(list)), [list]);
  const [currentChoiceIdx, setChoiceIndex] = useState(0);
  const [ranks, setRank] = useState(() =>
    list.map(el => ({ element: el, rank: 1 }))
  );

  function choose(choice) {
    const newRanks = ranks.map(r => {
      if (r.element === choice) {
        r.rank++;
      }
      return r;
    });

    setRank(newRanks);
    next();
  }

  function next() {
    if (currentChoiceIdx + 1 < choices.length) {
      setChoiceIndex(idx => idx + 1);
    } else {
      sortEnded(
        list.sort((elA, elB) => {
          const elARank = ranks.find(r => r.element === elA).rank;
          const elBRank = ranks.find(r => r.element === elB).rank;

          return elBRank - elARank;
        })
      );
    }
  }

  const [firstChoice, secondChoice] = choices[currentChoiceIdx] || [];

  return (
    <>
      <button className="btn" onClick={onExitSorter}>
        &larr; Retour
      </button>
      <h2>
        {currentChoiceIdx + 1}/{choices.length} - Choisissez votre préféré
      </h2>
      <div>
        <button
          className="btn btn-primary"
          title="Cliquez pour sélectionner"
          onClick={() => choose(firstChoice)}
        >
          {firstChoice}
        </button>
        <span style={{ margin: 10 }}>ou</span>
        <button
          className="btn btn-primary"
          title="Cliquez pour sélectionner"
          onClick={() => choose(secondChoice)}
        >
          {secondChoice}
        </button>
        <span style={{ margin: 10 }}>?</span>
      </div>
    </>
  );
}
