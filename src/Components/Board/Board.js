import React from "react";
import styles from "./Board.module.scss";
import cx from "classnames";

// squaresArr = [];
// generateSquares = () => {
//  for (let i = 0; i < 120; i++) {
//    squaresArr.push(createSquareHTML());
//  }
// };
// generateSquares()

class Board extends React.Component {
  createSquareHTML = () => <div className={cx(styles.square)}></div>;
  render() {
    const { board } = this.props;
    return (
      <div className={styles.board}>
        {board.map(square => this.createSquareHTML())}
      </div>
    );
  }
}

export default Board;
