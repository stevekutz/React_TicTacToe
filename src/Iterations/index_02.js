// import React from 'react';                       index_02
// import ReactDOM from 'react-dom';
// import './index.css';




class Square extends React.Component {
  constructor(props) {
    super(props);                       // constructor added to initialize state
    this.state = {                      // for each Square component created
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}   {/* Square re-rendered when clicked */}
      >
        {this.state.value}                     {/* We are passing in current state value */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square vaue = {i}/>;    // this was missing from CodePen
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
