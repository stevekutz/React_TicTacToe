// import React from 'react';                       index_04
// import ReactDOM from 'react-dom';
// import './index.css';




class Square extends React.Component {
  render() {
    return (
      <button                                     // Square components are 'controlled components' since
        className="square"                        // Board manages state and passes values as props
        onClick={() => this.props.onClick()}      // to each square 'telling it what to do' e.g. controlling
      >
        {this.props.value}           {/* state is passed as prop into Square */}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);                          // Board will manage state of each square
    this.state = {                         // and pass state to children using props
      squares: Array(9).fill(null),     // state for each squre intialized in constructor
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();         // slice is used to create a copy
    squares[i] = 'X';                                   // we focus on not changing(mutating) data
    this.setState({squares: squares});                  // this allows us to create 'pure components'
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}            // State is read from Board and passed as a prop into Square
        onClick={() => this.handleClick(i)}        // Board owns state(it is private to Board)
      />                                           //  onClick is also a prop. it is a function passed
    );                                             //
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
