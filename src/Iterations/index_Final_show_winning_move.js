import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = (props) => {           // Square is refactored into a 'functional component' that only
  return (
    <button className="square"
            onClick={props.onClick}>
      {props.value}
    </button>
  )
};

class Board extends React.Component {         // rewrite as functional component
  renderSquare(i) {
    return (                                // WE REMOVE this.  when converting to functional component
      <Square                                     // Board now receives both props from Game
        value={this.props.squares[i]}             // we should be able to make this a
        onClick={() => this.props.onClick(i)}     // functional component as well
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
};

class Game extends React.Component {       // State now resides in Game & constructor will be removed from Board
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,                      // stepNumber added to state
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);      // reset last item in history
    const current = history[history.length - 1];    // assigns last element      // allows new future moves
    const squares = current.squares.slice();                                     // from new current move
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({                            // we update history array with new array
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,                   // state variable stepNumber assigned to step
      xIsNext: (step % 2) === 0           // since X goes first, even values are 0's turn
    });
  }

 /*
  winningSquares(winningMove){

    this.setState({
      squares[winningMove[0]];

    })

  }
*/

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];             // we track current using stepNumber
    const winningMove = calculateWinner(current.squares);
    const winner = winningMove[0];
    console.log(winningMove);


    //  const winner = calculateWinner(current.squares);            // instead of history length

    const moves = history.map((step, move) => {                 // mapping over history array
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (                                                  // we add key in <li>
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    let winningSquares;
    if (winner) {
      status = "Winner: " + winner;
      winningSquares = "winningMove[0]";
      console.log(winningMove);
      //winningSquares = `${winningMove[0]}` + `${winningMove[1]}` + `${winningMove[1]}`;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}

          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {console.log(winningSquares)}
          <div>{winningSquares}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
       // return squares[a];
      console.log(a,b,c);
      return [a,b,c];
    }
  }
  return null;
}