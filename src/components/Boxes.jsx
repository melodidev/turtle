export default function Boxes({index, currentGuessIndex, guess, target}) {
  let boxSituations = ["", "", "", "", ""];

  if (index < currentGuessIndex) {
    evaluateLetters();
  }

  function evaluateLetters() {
    boxSituations = ["absent", "absent", "absent", "absent", "absent"];
    for (let [letter, indexes] of Object.entries(stringToObject(target))) {
      if (stringToObject(guess).hasOwnProperty(letter)) {
        
        let targetLetterIndexes = indexes;
        let guessLetterIndexes = stringToObject(guess)[letter];

        for (let i = 0; i < guessLetterIndexes.length; ) {
          let index = guessLetterIndexes[i];

          if (!targetLetterIndexes.includes(index)) {
            i++;
            continue;
          }

          boxSituations[index] = "success";
          removeItem(targetLetterIndexes, index);
          removeItem(guessLetterIndexes, index);
        };

        for (let i = 0; i < guessLetterIndexes.length; ) {
          let index = guessLetterIndexes[i];

          if (!targetLetterIndexes.length) {
            break;
          }

          boxSituations[index] = "present";
          targetLetterIndexes.pop();
          removeItem(guessLetterIndexes, index);
        };
      }
    }
  }

  function stringToObject(string) {
    let stringObject = {};
    for (let i = 0; i < string.length; i++) {
      if (!stringObject.hasOwnProperty(string[i])) {
        stringObject[string[i]] = [];
      }
      stringObject[string[i]].push(i);
    }
    return stringObject;
  }

  function removeItem(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  return (
    <div className="d-flex justify-content-center">
      {[...Array(5)].map((el, i) => (
        <Box key={i} letter={guess[i]} situation={boxSituations[i]} />
      ))}
    </div>
  )
}

function Box({letter, situation=""}) {
  let bg = "";
  if (situation == "success") {
    bg = "bg-green";
  } else if (situation == "present") {
    bg = "bg-yellow";
  } else if (situation == "absent") {
    bg = "bg-grey";
  }

  return (
    <div className={`wh-50 border border-2 border-secondary fs-2 mb-1 me-1 ${bg}`}>
      <div className="d-flex justify-content-center align-items-center box text-uppercase">{letter}</div>
    </div>
  );
}