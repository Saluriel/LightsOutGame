import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    // loop through the amount of rows and create an empty row
    for (let i = 0; i < nrows; i++) {
      let row = [];
      // push whether the lights are on or off for however many columns there are
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn)
      }
      // push the rows w/ the info on chanceLightStartsOn to the initial board
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // loop through every row in the board and then every cell in each row to see if the cells are unlit, if it returns true all cells are unlit if it returns false there are still cells that are lit
    let winCondition = board.every(row => row.every(cell => !cell))
    return winCondition;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const oldBoardCopy = oldBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, oldBoardCopy)
      flipCell(y + 1, x, oldBoardCopy)
      flipCell(y - 1, x, oldBoardCopy)
      flipCell(y, x + 1, oldBoardCopy)
      flipCell(y, x - 1, oldBoardCopy)

      // TODO: return the copy
      return oldBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div>
        <h3>YOU WON!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h3>
        <img src="https://external-preview.redd.it/Dhj1U9Ws06lRbKzZODKpGIuEmGCe1sHVh_qWCTEXPh4.jpg?auto=webp&s=b60ccde67d75dc7d21e2bc15024ecc176117ae04" alt="You win" />
      </div>
    )
  }

  // TODO

  // make table board
  let tableBoard = [];

  for (let i = 0; i < nrows; i++) {
    let row = [];
    for (let j = 0; j < ncols; j++) {
      let coord = `${i}-${j}`
      row.push(
        <Cell
          key={coord}
          isLit={board[i][j]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />)
    }
    tableBoard.push(<tr key={i}>{row}</tr>)
  }
  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  )

  // TODO
}

export default Board;
