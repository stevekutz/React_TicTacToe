import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// step 9) replace class Square with a functional component
//       notice that class version uses this.props & functional component version uses just props

const Square = (props) => {
  return (
    <button className = 'square' onClick={ props.onClick}>
      {props.value}
    </button>
  )
};


/*
class Square extends React.Component {

  /*  We don;t use this after step 6 & 7 since Board will manage state
  constructor(props) {            // 3) add constructor to manage state of current value
    super(props);
    this.state = {
      value: null,                // Square receives a prop value set in Board renderSquare method
    }
  }
  */

// render() {
// if using props, use button code below //
// return (                                 //* since child receives prop value, we use it
// <button className="square" onClick={ () => alert( this.props.value + ' was clicked ') }  >

// using state, we set Square component state with onClick
// any state changes will occur in children as well
//    <button className="square"
//   onClick={ () => this.setState({value: 'X'}) }   // 4)  state changed with onClick

//       onClick = { () => this.props.onClick() }
//   >
//      {/*this.state.value*/}                {/* 4) onClick modifies state value  */}
//      {/*this.props.value}     {/* 7) props passed in from Board will be used now */}


//    {/* console.log(this.props) */}
//    {/* this.props.value */}            {/* 2) set render to show prop 'value', we comment out when using state */}
//  </button>
// );
// }
//}
//

class Board extends React.Component {      // We are lifting state into a parent component
  constructor(props){                 // To collect data from multiple children, or to have two child components
    super(props);                     // communicate with each other, you need to declare the shared state in their
    this.state = {                    // parent component instead. The parent component can pass the state back down
      squares: Array(9).fill(null),   // each other and with the parent component.
      xIsNext: true    //
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();    // create a copy of the the array
    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }



  renderSquare(i) {                       // using props
    // return <Square value = {i}/>;    // 1) pass parent Board component prop 'value' to child Square component


    return <Square                           // using state
      value = {this.state.squares[i]}      // 5) make renderSquare read state of array
      onClick = { () => this.handleClick(i) } // 6) we set up a function that we can pass from Board to Square
      // NOTE: at this point we are passing 2 props:  value & onClick

    />

  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}        {/*onClick={props.handleAddTodo}*/}
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
  constructor(props) {                            //11)
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null,)
      }],
      IsNext: true
    }
  }








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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}