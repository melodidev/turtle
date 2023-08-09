let keyboard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export default function Keyboard(props) {

  function setClassName(key, target, guesses, currentGuessIndex) {
    let classNames = "d-flex justify-content-center rounded min-width-35 cursor-pointer fs-3 me-1 p-2";
    let bg = "bg-secondary";
    let greenLetters = [];

    for (let i = 0; i < currentGuessIndex; i++) {
      [...guesses[i]].forEach((letter, j) => {
        if (letter != key.toLowerCase()) {
          return;
        } else if (target.includes(letter) && target.lastIndexOf(letter) == j) {
          bg = "bg-green";
          greenLetters.push(letter);
          return;
        } else if (target.includes(letter) && !greenLetters.includes(letter)) {
          bg = "bg-yellow";
          return;
        } else if (!target.includes(letter)) {
          bg = "bg-grey text-secondary";
          return;
        }
      })
    }
    return `${classNames} ${bg}`;
  }

  return (
    <div className="my-3">
      {keyboard.map((row, i) => (
        <div className="d-flex justify-content-center mb-2" key={i}>
          {row.map((item) => (
            <div
              key={item}
              className={setClassName(item, props.target, props.guesses, props.currentGuessIndex)}
              value={item}
              onClick={() => props.handleMove(item)}
            >
              {item}
            </div>
          ))}
        </div>
      ))} 
    </div>
  )
}


