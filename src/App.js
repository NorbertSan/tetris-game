import React from "react";
import GlobalStyles from "theme/GlobalStyles";
import Board from "Components/Board/Board";
import {
  empty,
  occupied,
  rows,
  columns,
  possibilityShapes
} from "config/config";
import styles from "./App.module.scss";
import {
  setInitialState,
  createShape,
  addListeners,
  shapeExist,
  collisionDetection,
  moveDown,
  setTimer,
  leaveShape
} from "logic/StateOperation";

class App extends React.Component {
  state = {
    board: [],
    presentShapePosition: []
  };

  async game() {
    const timer = setInterval(async () => {
      if (collisionDetection(this)) {
        leaveShape(this);
      } else {
        await moveDown(this);
      }

      if (await !shapeExist(this)) await createShape(this);
    }, 500);
    setTimer(this, timer);
  }
  async componentDidMount() {
    await setInitialState(this);
    addListeners(this);
    this.game();
  }
  render() {
    return (
      <>
        <GlobalStyles />
        <div className={styles.wrapper}>
          <Board board={this.state.board} />
        </div>
      </>
    );
  }
}

export default App;
