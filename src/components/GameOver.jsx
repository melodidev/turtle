export default function GameOver(props) {
  return (
    <div className="position-absolute start-0 end-0 text-dark bg-light text-light width-200 rounded border border-3 border-secondary ms-auto me-auto mt-4">
      <div className="text-center my-2">
        {props.isWon ? (
          <i className="fa-solid fa-trophy fa-xl text-warning"></i>
        ) : (
          <span>{props.target}</span>
        )}
      
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button onClick={props.playAgain} type="button" className="btn btn-success">Play Again</button>
      </div>
    </div>
  )
}


