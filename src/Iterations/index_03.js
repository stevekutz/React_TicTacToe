// import React from 'react';                       index_03    better to skip to 4
// import ReactDOM from 'react-dom';
// import './index.css';




class Square extends React.Component {
  // TODO: remove the constructor
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    // TODO: use onClick={this.props.onClick}
    // TODO: replace this.state.value with this.props.value
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
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

  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;   // State is read from Board and passed as a prop
  }                                                    // into Square

                                                       // Board owns state(it is private to Board

  render() {
    const status = 'Next player: X';

    return (                                          // layout improved to visualize changes
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
