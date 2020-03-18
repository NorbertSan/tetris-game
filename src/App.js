import React from "react";
import Board from "Components/Board/Board";
import GameOverAlert from "Components/GameOverAlert/GameOverAlert";
import Panel from "Components/Panel/Panel";
import { levelTimer } from "config/config";
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
  setListenersToState,
  addFigure,
  tooglePause
} from "logic/StateOperation";

class App extends React.Component {
  state = {
    board: [],
    presentShapePosition: [],
    score: 0,
    level: 0,
    lines: 0,
    matrix: [],
    figures: 0,
    isPaused: false,
    isGameOver: false
  };

  async game() {
    const timer = setInterval(async () => {
      if (this.state.isPaused) return;
      if (collisionDetection(this)) {
        if (gameOverController(this)) {
          endGame(this);
        }
        leaveShape(this);
        scoreController(this);
      } else {
        moveDown(this);
      }
      if (await !shapeExist(this)) {
        await createShape(this);
        addFigure(this);
      }
    }, levelTimer.level1);
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
        <div className={styles.wrapper}>
          <Board
            board={this.state.board}
            matrix={this.state.matrix}
            isPaused={this.state.isPaused}
          />
          <Panel
            tooglePause={() => tooglePause(this)}
            score={this.state.score}
            level={this.state.level}
            lines={this.state.lines}
            figures={this.state.figures}
          ></Panel>
        </div>
      </>
    );
  }
}

export default App;
