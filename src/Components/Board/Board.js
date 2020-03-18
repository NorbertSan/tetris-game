import React from "react";
import styles from "./Board.module.scss";
import cx from "classnames";
import { empty, occupied, shape } from "config/config";
import { columns, squareSize } from "../../config/config";

class Board extends React.Component {
  createSquareHTML = (type, key) => {
    const classList = cx(styles.square, {
      [styles.empty]: type === empty,
      [styles.occupied]: type === occupied,
      [styles.shape]: type === shape
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
    const { board } = this.props;

    return (
      <div
        className={styles.board}
        style={{
          width: columns * squareSize,
          gridTemplateColumns: `repeat(${columns},1fr)`
        }}
      >
        {board.map((square, index) => this.createSquareHTML(square, index))}
      </div>
    );
  }
}

export default Board;
