import React from "react";
import {
  empty,
  occupied,
  rows,
  columns,
  possibilityShapes,
  shape,
  keysCode
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
    board
  });
};
export const createShape = self => {
  let { board } = self.state;
  //   let presentShapePosition = [...possibilityShapes[0].normal];
  //   presentShapePosition.forEach(item => (board[item] = shape));

  const matrixIndexes = possibilityShapes[0].reduce((prev, cur, index) => {
    if (cur === occupied) return [...prev, index];
    return [...prev];
  }, []);

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
export const addListeners = self => {
  const move = places => {
    let { presentShapePosition } = self.state;
    return presentShapePosition.map(item => item + places);
  };

  document.addEventListener("keyup", e => {
    let { presentShapePosition, board } = self.state;
    if (e.keyCode === keysCode.right) {
      if (
        presentShapePosition.filter(place => place % columns === columns - 1)
          .length === 0 &&
        presentShapePosition.filter(place => board[place + 1] === occupied)
          .length === 0
      ) {
        updateMatrix(self, 1);
        updateBoardWithShapes(self, move(1));
      }
    }
    if (e.keyCode === keysCode.left) {
      if (
        presentShapePosition.filter(place => place % columns === 0).length ===
          0 &&
        presentShapePosition.filter(place => board[place - 1] === occupied)
          .length === 0
      ) {
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
      const createZeroOneMatrix = () =>
        matrix.reduce((prev, cur, index) => {
          if (presentShapePosition.includes(cur)) return [...prev, 1];
          return [...prev, 0];
        }, []);

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

      let { presentShapePosition, matrix } = self.state;
      const zeroOneMatrix = createZeroOneMatrix();
      let zeroOneRowsMatrix = trasformArrToArrWithRows(zeroOneMatrix);
      rotate(zeroOneRowsMatrix);
      zeroOneRowsMatrix = transpose(zeroOneRowsMatrix);
      const destructuredArr = destructureRows(zeroOneRowsMatrix);
      clearShapes();
      console.log(presentShapePosition);
      drawNewShape(destructuredArr);
      console.log(presentShapePosition);
      setNewShape();
    }
  });
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
  updateMatrix(self, 8);
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

export const setTimer = (self, timer) => self.setState({ timer });

export const leaveShape = self => {
  let { presentShapePosition, board } = self.state;
  presentShapePosition.forEach(place => (board[place] = occupied));
  presentShapePosition = [];
  self.setState({ presentShapePosition, board });
};
