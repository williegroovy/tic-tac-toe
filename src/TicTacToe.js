import React from 'react'

import GameBoard from './GameBoard';
import { Container, GameControls, PlayerStatus } from "./styled-components";

const GAME_CONSTS = {
  GAME_PIECE: {
    X: 'X',
    O: 'O'
  },
  MAX_GAME_TURNS: 9,
  MIN_WIN_TURNS: 5,
  WIN_CONDITIONS: [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ]
};

const TicTacToe = () => {

  const { GAME_PIECE, MAX_GAME_TURNS, MIN_WIN_TURNS, WIN_CONDITIONS } = GAME_CONSTS;

  const initialGameData = {
    boardData: new Array(9).fill(''),
    currGamePiece: GAME_CONSTS.GAME_PIECE.X,
    gameTurn: 1,
    winner: false,
    gamesPlayed: {
      total: 0,
      wins: {
        [GAME_PIECE.X]: 0,
        [GAME_PIECE.O]: 0
      }
    }
  };

  const [gameData, setGameData] = React.useState(initialGameData);
  const { boardData, currGamePiece, gameTurn, winner, gamesPlayed } = gameData;


  React.useEffect(() => {

    const updateGamesPlayed = gameTurn > MAX_GAME_TURNS || winner;


    updateGamesPlayed && setGameData(
      {
        ...gameData,
        gamesPlayed: {
          ...gamesPlayed,
          total: gamesPlayed.total + 1,
          wins: {
            ...gamesPlayed.wins,
            ...winner && { [currGamePiece]: gamesPlayed.wins[currGamePiece] + 1 }
          }
        }
      })
    // Run effect on game reset or an actual winn occurring.
  }, [gameTurn, winner]);

  const resetGameData = () => {
    setGameData({
      ...initialGameData,
      gamesPlayed
    });
  };

  const hasWinCondition = (nextBoardData) =>
    WIN_CONDITIONS.reduce((winner, winCondition) => {
      console.log('nextBoardData', nextBoardData);
      if (!winner) {
        const potentialWinCondition = winCondition.map(position => nextBoardData[position]);

        console.log('potentialWinCondition', potentialWinCondition);
        // If every game position has the curr game piece it's a win.
        if (potentialWinCondition.every(conditionPosition => conditionPosition === currGamePiece)) {
          return currGamePiece;
        }
      }

      return winner;

    }, false);

  const gameBoardClicked = (index) => {
    console.log('index', index);
    if(!winner) {
      const dataIndex = parseInt(index);

      const nextBoardData = [
        ...boardData.slice(0, dataIndex),
        currGamePiece, ...boardData.slice(dataIndex + 1, gameData.length)
      ];

      const minimumGameTurnsMet = gameTurn >= MIN_WIN_TURNS;

      const winConditionMet = minimumGameTurnsMet && hasWinCondition(nextBoardData);
      const nextGamePiece = currGamePiece === GAME_PIECE.X ? GAME_PIECE.O : GAME_PIECE.X;

      setGameData({
        ...gameData,
        boardData: nextBoardData,
        gameTurn: gameTurn + 1,
        winner: winConditionMet,
        // Conditionally add new gamePiece if there is no winner
        ...!winConditionMet && { currGamePiece: nextGamePiece },
      });
    }
  };

  const renderGameReset = gameTurn > MAX_GAME_TURNS && !winner;
  const tiedGames = gamesPlayed.total - (gamesPlayed.wins[GAME_PIECE.X] + gamesPlayed.wins[GAME_PIECE.O]);

  return (
    <Container>
      <h3>Tic Tac Toe</h3>
      <GameControls>
        {
          Object.values(GAME_PIECE).map(
            (piece) => (
              <PlayerStatus
                key={piece}
                active={piece === currGamePiece}>
                {piece} - {gamesPlayed.wins[piece]}
              </PlayerStatus>
            ))
        }
      </GameControls>
      <GameBoard
        boardData={boardData}
        currGamePiece={currGamePiece}
        onGameBoardClicked={gameBoardClicked}
        onResetGameData={resetGameData}
        winner={winner}
        renderGameReset={renderGameReset}
      />
      { tiedGames > 0 && <div style={{ marginTop: '10px' }}>Tied - {tiedGames}</div> }
    </Container>
  )
};

export default TicTacToe;
