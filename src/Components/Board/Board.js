import React from "react";
import styles from "./Board.module.scss";
import cx from "classnames";
import { empty, occupied, shape } from "config/config";
import { columns, squareSize, rows } from "../../config/config";

class Board extends React.Component {
  createSquareHTML = (type, key) => {
    const classList = cx(styles.square, {
      [styles.empty]: type === empty,
      [styles.occupied]: type === occupied,
      [styles.shape]: type === shape,
      [styles.matrix]: this.props.matrix.includes(key)
    });
    return (
      <div
        style={{ width: squareSize, height: squareSize }}
        key={key}
        className={classList}
      ></div>
    );
  };
  render() {
    const { board, isPaused, isGameOver, score } = this.props;
    const boardClassList = cx(styles.board, {
      [styles.paused]: isPaused
      // [styles.gameOver]: isGameOver
    });
    const boardStyles = {
      width: columns * squareSize + columns,
      height: rows * squareSize + rows,
      paddingRight: columns * squareSize + columns,
      paddingBottom: rows * squareSize + rows,
      gridTemplateColumns: `repeat(${columns},1fr)`
    };
    return (
      <div className={boardClassList} style={boardStyles}>
        {isGameOver && (
          <div className={styles.gameOverInfo}>
            <h3>Game over</h3>
            <span>Your score : {score}</span>
          </div>
        )}
        {board.map((square, index) => this.createSquareHTML(square, index))}
      </div>
    );
  }
}

export default Board;
