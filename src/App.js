import React from "react";
import GlobalStyles from "theme/GlobalStyles";
import Board from "Components/Board/Board";
import { empty, occupied, rows, columns } from "config/config";

class App extends React.Component {
  state = {
    board: []
  };

  setInitialState = () => {
    const board = [];
    for (let i = 0; i < rows * columns; i++) board[i] = 0;
    this.setState({
      board
    });
  };
  componentDidMount() {
    this.setInitialState();
  }
  render() {
    return (
      <>
        <GlobalStyles />
        <Board board={this.state.board} />
      </>
    );
  }
}

export default App;
