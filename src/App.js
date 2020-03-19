import React from "react";
import Board from "Components/Board/Board";
import GameOverAlert from "Components/GameOverAlert/GameOverAlert";
import Panel from "Components/Panel/Panel";
import styles from "./App.module.scss";
import {
  setInitialState,
  createShape,
  getListeners,
  shapeExist,
  collisionDetection,
  moveDown,
  setTimerIntoState,
  leaveShape,
  scoreController,
  gameOverController,
  setListenersToState,
  addFigure,
  tooglePause,
  speedController,
  gamePausedController,
  disableKeyListeners,
  setKeysMoves,
  setGameOverState,
  restartGame
} from "logic/StateOperation";

class App extends React.Component {
  state = {
    board: [],
    presentShapePosition: [],
    score: 0,
    level: 1,
    lines: 0,
    matrix: [],
    figures: 0,
    isPaused: false,
    isGameOver: false
  };

  async game() {
    const gameLoop = async () => {
      setKeysMoves(this);
      if (gamePausedController(this)) {
        disableKeyListeners(this);
        return;
      }

      if (collisionDetection(this)) {
        if (gameOverController(this)) {
          disableKeyListeners(this);
          setGameOverState(this);
          return;
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

      clearInterval(timer);
      timer = setInterval(gameLoop, speedController(this));
    };

    let timer = setInterval(gameLoop, 1000);
    setTimerIntoState(this, timer);
  }
  async start() {
    await setInitialState(this);
    const keyMovesFunc = getListeners(this);
    await setListenersToState(this, keyMovesFunc);
    setKeysMoves(this);
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
            isGameOver={this.state.isGameOver}
            board={this.state.board}
            matrix={this.state.matrix}
            isPaused={this.state.isPaused}
            score={this.state.score}
          />
          <Panel
            tooglePause={() => tooglePause(this)}
            restartGame={() => restartGame(this)}
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
