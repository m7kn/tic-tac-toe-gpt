import React from "react";
import './Game.css';
import './Square.css';

function checkWinner(board) {
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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function checkDraw(board) {
  return board.every((square) => square);
}

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        className="square"
        value={this.props.board[i]}
        onClick={() => this.props.onClick(i)}
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
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      players: ["X", "O"],
      currentPlayer: 0,
      winner: null,
      draw: false,
    };
  }

  handleClick(i) {
    const board = this.state.board.slice();
    if (this.state.winner || board[i]) return;
    board[i] = this.state.players[this.state.currentPlayer];
    const winner = checkWinner(board);
    this.setState({
      board: board,
      currentPlayer: (this.state.currentPlayer + 1) % 2,
      winner: winner,
      draw: winner ? false : checkDraw(board),
    });
  }

  render() {
    const status = this.state.winner
      ? `Winner: ${this.state.winner}`
      : this.state.draw
      ? "Draw"
      : `Next player: ${this.state.players[this.state.currentPlayer]}`;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            board={this.state.board}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
