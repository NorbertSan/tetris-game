import React from 'react';
import { empty, occupied, rows, columns,possibilityShapes,shape} from "config/config";

const updateBoardWithShapes = (self,shapes)=>{
    let {board} = self.state;
    board.forEach((item,index)=> {
        if(item === shape) board[index]=empty;
    })
    shapes.forEach(item=> board[item] = shape)
    self.setState({
        board,
        presentShapePosition : shapes
    })
}


export const setInitialState = self =>{
    let board = [];
    for (let i = 0; i < rows * columns; i++) board[i] = empty;
    board[119] =1 ;
    self.setState({
      board,
    });
}
export const createShape = self =>{
    let {board,presentShapePosition} =self.state;
    presentShapePosition = possibilityShapes[0];
    possibilityShapes[0].forEach(item=> board[item] = shape)
    self.setState({
        board,
        presentShapePosition
    })
};
export const addListeners = self=>{
    document.addEventListener('keyup',e=>{
        // if(e.keyCode ===39) //right
        // if(e.keyCode ===37) //left
        // if(e.keyCode ===38) //up
        // if(e.keyCode ===40) //right
        // console.log(e.keyCode)
    })
};
export const shapeExist = self=> self.state.presentShapePosition.length === 0
// export const shapeController = self =>{
//     let { board,presentShapePosition} = self.state;
//     console.log(board.includes(presentShapePosition.forEach(item)))
// }

export const moveDown = self =>{
    let {presentShapePosition} = self.state;
    presentShapePosition.forEach((item,index,arr)=> arr[index]+=columns)
    updateBoardWithShapes(self,presentShapePosition)
}