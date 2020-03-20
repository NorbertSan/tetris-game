import React from "react";
import {
  empty,
  occupied,
  rows,
  columns,
  possibilityShapes,
  shape,
  keysCode,
  threshold,
  levelsOfDifficulty
} from "config/config";

const updateBoardWithShapes = (self, shapes) => {
  let { board } = self.state;
  board.forEach((item, index) => {
    if (item === shape) board[index] = empty;
  });
  shapes.forEach(item => (board[item] = shape));
  self.setState({
    board,
    presentShapePosition: shapes
  });
};
export const setInitialState = self => {
  let board = [];
  for (let i = 0; i < rows * columns; i++) board[i] = empty;
  self.setState({
    board,
    isGameOver: false,
    presentShapePosition: [],
    score: 0,
    level: 1,
    lines: 0,
    matrix: [],
    figures: 0,
    isPaused: false
  });
};
export const createShape = self => {
  let { board } = self.state;
  let randomShape = Math.floor(Math.random() * possibilityShapes.length);
  const matrixIndexes = possibilityShapes[randomShape].reduce(
    (prev, cur, index) => {
      if (cur === occupied) return [...prev, index];
      return [...prev];
    },
    []
  );

  const matrix = [
    Math.floor(columns / 2 - 1) - columns,
    Math.floor(columns / 2) - columns,
    Math.floor(columns / 2 + 1) - columns,
    Math.floor(columns / 2 - 1),
    Math.floor(columns / 2),
    Math.floor(columns / 2 + 1),
    Math.floor(columns / 2 - 1) + columns,
    Math.floor(columns / 2) + columns,
    Math.floor(columns / 2 + 1) + columns
  ];
  const presentShapePosition = matrixIndexes.reduce((prev, cur) => {
    return [...prev, matrix[cur]];
  }, []);
  presentShapePosition.forEach(number => (board[number] = shape));
  self.setState({
    board,
    presentShapePosition,
    matrix
  });
};
export const getListeners = self => {
  const move = places => {
    let { presentShapePosition } = self.state;
    return presentShapePosition.map(item => item + places);
  };

  const keysMoves = e => {
    let { presentShapePosition, board } = self.state;
    const moveRightController = () =>
      presentShapePosition.filter(place => place % columns === columns - 1)
        .length === 0 &&
      presentShapePosition.filter(place => board[place + 1] === occupied)
        .length === 0;

    const moveLeftController = () =>
      presentShapePosition.filter(place => place % columns === 0).length ===
        0 &&
      presentShapePosition.filter(place => board[place - 1] === occupied)
        .length === 0;

    if (e.keyCode === keysCode.right) {
      if (moveRightController()) {
        updateMatrix(self, 1);
        updateBoardWithShapes(self, move(1));
      }
    }
    if (e.keyCode === keysCode.left) {
      if (moveLeftController()) {
        updateMatrix(self, -1);
        updateBoardWithShapes(self, move(-1));
      }
    }
    if (e.keyCode === keysCode.down) {
      if (!collisionDetection(self)) {
        moveDown(self);
      }
    }
    if (e.keyCode === keysCode.space) {
      while (true) {
        if (collisionDetection(self)) break;
        moveDown(self);
      }
    }

    if (e.keyCode === keysCode.up) {
      //up

      const rotate = arr => arr.reverse();
      const transpose = arr =>
        (arr = [
          [arr[0][0], arr[1][0], arr[2][0]],
          [arr[0][1], arr[1][1], arr[2][1]],
          [arr[0][2], arr[1][2], arr[2][2]]
        ]);
      const createZeroOneMatrix = () => {
        return matrix.reduce((prev, cur) => {
          if (presentShapePosition.includes(cur)) return [...prev, 1];
          return [...prev, 0];
        }, []);
      };

      const trasformArrToArrWithRows = zeroOneMatrix => [
        zeroOneMatrix.splice(0, 3),
        zeroOneMatrix.splice(0, 3),
        zeroOneMatrix.splice(0, 3)
      ];
      const destructureRows = zeroOneRowsMatrix => {
        let destructuredArr = [];
        destructuredArr = destructuredArr.concat(zeroOneRowsMatrix[0]);
        destructuredArr = destructuredArr.concat(zeroOneRowsMatrix[1]);
        destructuredArr = destructuredArr.concat(zeroOneRowsMatrix[2]);
        return destructuredArr;
      };
      const clearShapes = () => (presentShapePosition = []);
      const drawNewShape = destructuredArr => {
        destructuredArr.forEach((item, index) => {
          if (item === 1) {
            presentShapePosition.push(matrix[index]);
          }
        });
      };
      const setNewShape = () => self.setState({ presentShapePosition });
      const outOfBoardController = () => {
        // check if matrix is included in firts and last row, that means that next press keyup
        const matrixSize = Math.sqrt(matrix.length);
        const arr = matrix.reduce((prev, cur) => {
          if (cur % columns === 0 || cur % columns === columns - 1)
            return [...prev, cur];
          else return [...prev];
        }, []);
        if (arr.length >= 2 * matrixSize) return true;
      };

      // FUNCTIONS INVOKED
      let { presentShapePosition, matrix } = self.state;
      if (outOfBoardController()) return;
      const zeroOneMatrix = createZeroOneMatrix();
      let zeroOneRowsMatrix = trasformArrToArrWithRows(zeroOneMatrix);
      rotate(zeroOneRowsMatrix);
      zeroOneRowsMatrix = transpose(zeroOneRowsMatrix);
      const destructuredArr = destructureRows(zeroOneRowsMatrix);
      clearShapes();
      drawNewShape(destructuredArr);
      // check if new shape is on board

      setNewShape();
    }
  };
  // document.body.addEventListener("keyup", keysMoves);

  return keysMoves;
};
export const setKeysMoves = self => {
  let { keyListeners } = self.state;
  document.body.addEventListener("keyup", keyListeners);
};

export const shapeExist = self => self.state.presentShapePosition.length !== 0;

const updateMatrix = (self, position) => {
  let { matrix } = self.state;
  if (matrix) matrix.forEach((item, index, arr) => (arr[index] += position));
  self.setState({
    matrix
  });
};

export const moveDown = self => {
  let { presentShapePosition } = self.state;
  presentShapePosition.forEach((item, index, arr) => (arr[index] += columns));
  updateMatrix(self, columns);
  updateBoardWithShapes(self, presentShapePosition);
};

export const collisionDetection = self => {
  let { board, presentShapePosition } = self.state;
  const intentioalPosition = presentShapePosition.map(
    place => (place += columns)
  );

  const endBoardDetection = () => {
    if (intentioalPosition.findIndex(place => place >= columns * rows) !== -1) {
      return true; //STOP
    }
  };
  const occupiedDetection = () => {
    if (intentioalPosition.findIndex(place => board[place] === occupied) !== -1)
      return true;
  };
  if (endBoardDetection() || occupiedDetection()) return true;
};

export const setTimerIntoState = (self, timer) => self.setState({ timer });

export const leaveShape = self => {
  let { presentShapePosition, board } = self.state;
  presentShapePosition.forEach(place => (board[place] = occupied));
  presentShapePosition = [];
  self.setState({ presentShapePosition, board });
};

export const scoreController = self => {
  const addScore = () => {
    // add score based on present level
    let { score, level } = self.state;
    score += level;
    return score;
  };
  const addLine = () => {
    let { lines } = self.state;
    lines++;
    return lines;
  };
  const addLevel = newScore => {
    let newLevel = Math.floor(newScore / threshold) + 1;
    if (newLevel >= Object.keys(levelsOfDifficulty).length) {
      newLevel = Object.keys(levelsOfDifficulty).length;
    }
    return newLevel;
  };
  const destroyLine = row => {
    // all rows above destroy row have to drop down by 1 row, and first row have to be empty
    let { board } = self.state;
    // drop rows by 1 row
    let modificatedBoard = [];

    // set first lane to empty
    for (let i = 0; i < columns; i++) modificatedBoard[i] = empty;

    // copy destroy lane and all rows under
    for (let i = row * columns; i < rows * columns; i++)
      modificatedBoard[i] = board[i];
    // takes all rows above and dropdown by one row
    for (let i = 0; i < row * columns; i++)
      modificatedBoard[i + columns] = board[i];

    return modificatedBoard;
  };
  const updateState = (score, board, lines, level) =>
    self.setState({ score, board, lines, level });

  let { board } = self.state;
  for (let i = 0; i < rows; i++) {
    let score = true;
    for (let j = 0; j < columns; j++) {
      if (board[i * columns + j] !== occupied) score = false;
    }
    if (score) {
      // i - line to destroy
      const newScore = addScore();
      const newBoard = destroyLine(i);
      const newLines = addLine();
      const newLevel = addLevel(newScore);
      updateState(newScore, newBoard, newLines, newLevel);
    }
  }
};

export const gameOverController = self => {
  const { presentShapePosition } = self.state;
  if (
    presentShapePosition.findIndex(
      position => position > 0 && position < columns
    ) !== -1
  )
    return true;
  else return false;
};
export const disableKeyListeners = self => {
  let { keyListeners } = self.state;
  document.body.removeEventListener("keyup", keyListeners);
};

export const setListenersToState = (self, func) => {
  self.setState({
    keyListeners: func
  });
};

export const addFigure = self => {
  let { figures } = self.state;
  figures++;
  self.setState({
    figures
  });
};

export const tooglePause = self => {
  self.setState(prevState => ({ isPaused: !prevState.isPaused }));
};

export const speedController = self => {
  let { level } = self.state;

  return levelsOfDifficulty[`level${level}`];
};

export const gamePausedController = self => self.state.isPaused;

export const setGameOverState = self =>
  self.setState({
    isGameOver: true
  });
export const restartGame = self => {
  setInitialState(self);
};
