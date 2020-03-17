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
  let presentShapePosition = [...possibilityShapes[0]];
  presentShapePosition.forEach(item => (board[item] = shape));
  self.setState({
    board,
    presentShapePosition
  });
};
export const addListeners = self => {
  const move = places => {
    let { presentShapePosition } = self.state;
    return presentShapePosition.map(item => item + places);
  };

  document.addEventListener("keyup", e => {
    let { presentShapePosition, board } = self.state;
    if (e.keyCode === 39) {
      if (
        presentShapePosition.filter(place => place % columns === columns - 1)
          .length === 0 &&
        presentShapePosition.filter(place => board[place + 1] === occupied)
          .length === 0
      )
        updateBoardWithShapes(self, move(1)); //right
    }
    if (e.keyCode === 37) {
      if (
        presentShapePosition.filter(place => place % columns === 0).length ===
          0 &&
        presentShapePosition.filter(place => board[place - 1] === occupied)
          .length === 0
      )
        updateBoardWithShapes(self, move(-1)); //left
    }
    if (e.keyCode === 40) {
      // down
      if (!collisionDetection(self)) {
        moveDown(self);
      }
    }

    // if(e.keyCode ===38) //up
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
