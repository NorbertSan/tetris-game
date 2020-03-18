import React from "react";
import GlobalStyles from "theme/GlobalStyles";
import Board from "Components/Board/Board";
import GameOverAlert from "Components/GameOverAlert/GameOverAlert";
import Panel from "Components/Panel/Panel";
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
  leaveShape,
  scoreController,
  gameOverController,
  endGame,
  setListenersToState
} from "logic/StateOperation";

class App extends React.Component {
  state = {
    board: [],
    presentShapePosition: [],
    score: 0,
    matrix: [],
    isGameOver: false
  };

  async game() {
    const timer = setInterval(async () => {
      if (collisionDetection(this)) {
        if (gameOverController(this)) {
          endGame(this);
        }
        leaveShape(this);
        scoreController(this);
      } else {
        moveDown(this);
      }
      if (await !shapeExist(this)) await createShape(this);
    }, 500);
    setTimer(this, timer);
  }
  async start() {
    await setInitialState(this);
    const keyMovesFunc = addListeners(this);
    setListenersToState(this, keyMovesFunc);
  }
  componentDidMount() {
    this.start();
    this.game();
  }
  render() {
    return (
      <>
        <GlobalStyles />
        <div className={styles.wrapper}>
          <Board board={this.state.board} matrix={this.state.matrix} />
        </div>
        <h2>Score : {this.state.score}</h2>
      </>
    );
  }
}

export default App;
