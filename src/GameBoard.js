import React from 'react';
import {BoardPosition, GameBoardContainer, ResetContainer } from "./styled-components";

const GameBoard = ({ boardData, onGameBoardClicked, onResetGameData, currGamePiece, winner, renderGameReset }) => {

  if (winner || renderGameReset) {
    return (
      <ResetContainer>
        { winner ? <h3>{`Winner: ${winner}`}</h3> : renderGameReset && <h3>Tie</h3> }
        <button onClick={onResetGameData}>Play Again</button>
      </ResetContainer>
    )
  }

  return (
    <GameBoardContainer>
      {
        boardData.map((piece, idx) =>
          <BoardPosition
            onClick={() => piece === '' && onGameBoardClicked(idx)}
            key={idx}
            active={piece === currGamePiece}>
            {piece}
          </BoardPosition>
        )
      }
    </GameBoardContainer>
  )
};

export default GameBoard;