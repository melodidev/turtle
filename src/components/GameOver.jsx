export default function GameOver(props) {
  return (
    <div>
      <div className="text-center my-2">
        {props.isWon ? (
          <i className="fa-solid fa-trophy fa-xl text-warning"></i>
        ) : (
          <span>{props.target}</span>
        )}
      
      </div>
      <div className="d-flex justify-content-center">
        <button onClick={props.playAgain} type="button" className="btn btn-success">Play Again</button>
      </div>
    </div>
  )
}


