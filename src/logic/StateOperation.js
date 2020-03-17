import React from "react";
import {
  empty,
  occupied,
  rows,
  columns,
  possibilityShapes,
  shape
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
  console.log(possibilityShapes[0]);
  let presentShapePosition = [...possibilityShapes[0]];
  presentShapePosition.forEach(item => (board[item] = shape));
  self.setState({
    board,
    presentShapePosition
  });
};
export const addListeners = self => {
  document.addEventListener("keyup", e => {
    // if(e.keyCode ===39) //right
    // if(e.keyCode ===37) //left
    // if(e.keyCode ===38) //up
    // if(e.keyCode ===40) //right
    // console.log(e.keyCode)
  });
};
export const shapeExist = self => self.state.presentShapePosition.length !== 0;

export const moveDown = self => {
  let { presentShapePosition } = self.state;
  presentShapePosition.forEach((item, index, arr) => (arr[index] += columns));
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
