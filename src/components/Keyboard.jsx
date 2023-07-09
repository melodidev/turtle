let keyboard = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L",
  "enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"
];

export default function Keyboard(props) {
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center">
        {keyboard.slice(0, 10).map(item => (
          <div
            key={item}
            className="d-flex justify-content-center bg-secondary rounded min-width-35 cursor-pointer fs-3 me-1 p-2"
            value={item}
            onClick={() => props.handleMove(item)}
            >{item}
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center my-2">
        {keyboard.slice(10, 19).map(item => (
          <div
            key={item}
            className="d-flex justify-content-center bg-secondary rounded min-width-35 cursor-pointer fs-3 me-1 p-2"
            value={item}
            onClick={() => props.handleMove(item)}
            >{item}
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        {keyboard.slice(19).map(item => (
          <div
            key={item}
            className="d-flex justify-content-center bg-secondary rounded min-width-35 cursor-pointer fs-3 me-1 p-2"
            value={item}
            onClick={() => props.handleMove(item)}
            >{item}
          </div>
        ))}
      </div>   
    </div>
  )
}


