import React, { useState } from 'react';
import Box from './Box';
import BoardLogic from './BoardLogic';

const boardLogic = new BoardLogic(3);
const initialBoard = boardLogic.scramble()

const Board = () => {
  const [board, setBoard] = useState(initialBoard)
  const [moves, setMoves] = useState(0)
  const [isWin, setIsWin] = useState(false)

  const onMove = (i, j) => {
    console.log(`Clicked tile ${i},${j}`)
  }

  const newGame = () => {
    setBoard(boardLogic.scramble());
    setMoves(0);
    setIsWin(boardLogic.checkWin());
  };

  const move = (i, j) => {
    if (isWin) return;

    if (boardLogic.move(i, j)) {
      onMove(i, j);
      setBoard(boardLogic.matrix);
      setMoves(moves + 1);
      setIsWin(boardLogic.checkWin());
    }
  }

  /**
   * returns a single slider row given the row data
   * @param {Object} rowData row data
   * @param {Number} i row number
   */
  const getRow = (rowData, j) => {
    return (
      <div key={j} >
        {rowData.map((bNum, i) => <Box key={bNum} boxNumber={bNum} onClick={() => move(i, j)} />)}
      </div>
    );
  }

  return (
    <div className="slider-board">
      {board.map(getRow)}
      <span className="slider-msg">
        {(isWin ? "Winner !!! " : "Total ") + `Moves: ${moves}`}
      </span>
      <div className="btn-new-game">
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  );
}

export default Board;