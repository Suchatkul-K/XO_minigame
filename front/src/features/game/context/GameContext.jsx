import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Gamecontext = createContext();

export default function GameContextProvider({ children }) {
  const params = useParams();

  const { x, y, rule, type } = params;

  const initialTable = [];

  for (let j = 0; j < y; j++) {
    let temp = [];
    for (let i = 0; i < x; i++) {
      temp.push([i, j, ""]);
    }
    initialTable.push(temp);
    // console.log(initialTable)
  }

  const [table, setTable] = useState(initialTable);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [history, setHistory] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  // const [isReplay, setIsReplay] = useState(false);
  const [replayTurn, setReplayTurn] = useState(0);
  const [showWaitingMessage, setShowWaitingMessage] = useState(false);

  useEffect(() => {
    // To Prevent Quick play Bug
    setup();
  }, [params]);

  const setup = () => {
    setTable(initialTable);
    setPlayerTurn(true);
    setIsEnd(false);
    setHistory([]);
    setIsMoving(false);
    // setIsReplay(false);
    setShowWaitingMessage(false);
  };

  const resetGame = () => {
    console.log("resetGame");
    // Auto reset
    // window.location.reload()

    // manual reset
    setup();

    //close Modal
    document.getElementById("post_game_modal").close();

    toast.info("Game has been reset");
  };

  const handleMove = (row, col, mark = "X") => {
    setShowWaitingMessage(false);
    setIsMoving(true);
    // update table
    let temp = [...table];
    temp[row][col].splice(2, 1, mark);
    setTable(temp);
    const updateHistory = [...history, [col, row, mark]];
    setHistory(updateHistory);

    checkWinner(row, col);
    // check draw
    if (updateHistory.length >= x * y) {
      setIsEnd(true);
      setReplayTurn(updateHistory.length);

      document.getElementById("post_game_modal").showModal();
    }
    setIsMoving(false);
  };

  let scoreCount = 1;
  //TODO: highligh all the winning tiles(red background!?)
  // store co-od  when score count change OR made it {score, [coodArray,[], ...]}
  // let winCoodArray = []

  const isWin = () => {
    if (scoreCount >= rule) {
      console.log(`Player ${playerTurn ? "X" : "O"} Wins`);
      setReplayTurn(history.length + 1);
      setIsEnd(true);

      document.getElementById("post_game_modal").showModal();
      return true;
    } else {
      scoreCount = 1;
      return false;
    }
  };

  const verticalCheck = (row, col, currentMove) => {
    // console.log("run vertical check");
    // upper
    for (let i = 1; i < rule; i++) {
      //catch out of bound error
      if (row - i < 0) {
        break;
      }

      //run count
      if (table[row - i][col][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    // lower
    for (let i = 1; i < rule; i++) {
      //catch out of bound error
      if (row + i >= y) {
        break;
      }

      //run count
      if (table[row + i][col][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    return isWin();
  };

  const horizontalCheck = (row, col, currentMove) => {
    // console.log("run horizontal check");
    // upper
    for (let i = 1; i < rule; i++) {
      //catch out of bound error
      if (col - i < 0) {
        break;
      }

      //run count
      if (table[row][col - i][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    // lower
    for (let i = 1; i < rule; i++) {
      //catch out of bound error
      if (col + i >= x) {
        break;
      }

      //run count
      if (table[row][col + i][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    return isWin();
  };

  const crossCheck = (row, col, currentMove) => {
    // console.log("run cross check");
    // upper-left
    for (let i = 1; i < rule; i++) {
      //catch out of bound error
      if (row - i < 0 || col - i < 0) {
        break;
      }

      //run count
      if (table[row - i][col - i][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    // lower-right
    for (let i = 1; i < rule; i++) {
      //catch out of bound error
      if (row + i >= y || col + i >= x) {
        break;
      }

      //run count
      if (table[row + i][col + i][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    if (isWin()) {
      return true;
    }

    // upper-right
    for (let i = 1; i < rule; i++) {
      //catch out of bound error
      if (row - i < 0 || col + i >= x) {
        break;
      }

      //run count
      if (table[row - i][col + i][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    // lower-left
    for (let i = 1; i < rule; i++) {
      //catch out of bound error
      if (row + i >= y || col - i < 0) {
        break;
      }

      //run count
      if (table[row + i][col - i][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    if (isWin()) {
      return true;
    }

    return false;
  };

  const checkWinner = (row, col) => {
    const currentMove = table[row][col][2];
    // console.log("row", row)
    // console.log("col", col)
    // console.log("x",x)
    // console.log("y",y)

    verticalCheck(row, col, currentMove)
      ? toast.success("winner found")
      : horizontalCheck(row, col, currentMove)
      ? toast.success("winner found")
      : crossCheck(row, col, currentMove)
      ? toast.success("winner found")
      : setPlayerTurn(!playerTurn);
  };

  const handlePlay = (row, col) => {
    if (isEnd || isMoving) {
      return;
    }
    if (table[row][col][2] != "") {
      console.log("invalid move");
    } else {
      if (playerTurn) {
        handleMove(row, col);
      } else {
        handleMove(row, col, "O");
      }
    }
  };

  useEffect(() => {
    // Set a delay of 3 seconds
    const timer = setTimeout(() => {
      setShowWaitingMessage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [history]);

  // Replay turn handle
  const handleLastTurn = () => {
    if (replayTurn > 1) {
      // const replay = history.slice(0, replayTurn - 1);
      // console.log("Last", replay)
      const change = history.slice(replayTurn - 1, replayTurn);
      // console.log("change", change)

      let temp = [...table];
      temp[change[0][1]][change[0][0]].splice(2, 1, "");
      setTable(temp);

      setReplayTurn(replayTurn - 1);
    }
  };

  const handleNextTurn = () => {
    if (replayTurn < history.length) {
      // const replay = history.slice(0, replayTurn + 1);
      // console.log("Next", replay)
      const change = history.slice(replayTurn, replayTurn + 1);
      // console.log("change", change)

      let temp = [...table];
      temp[change[0][1]][change[0][0]].splice(2, 1, change[0][2]);
      setTable(temp);

      setReplayTurn(replayTurn + 1);
    }
  };

  return (
    <Gamecontext.Provider
      value={{
        params,
        table,
        handlePlay,
        isEnd,
        history,
        playerTurn,
        resetGame,
        showWaitingMessage,
        replayTurn,
        handleLastTurn,
        handleNextTurn,
      }}
    >
      {children}
    </Gamecontext.Provider>
  );
}

export const useGameContext = () => useContext(Gamecontext);
