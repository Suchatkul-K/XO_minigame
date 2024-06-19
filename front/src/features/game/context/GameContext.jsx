import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Gamecontext = createContext();

export default function GameContextProvider({ children }) {
  const params = useParams();

  // console.log(params)
  // x,y,rule,type

  const { x, y, rule, type } = params;
  // console.log("xxxxx",x)
  // console.log("yyyyy",y)
  // console.log("rule", rule)

  const initialTable = [];

  for (let j = 0; j < y; j++) {
    let temp = [];
    for (let i = 0; i < x; i++) {
      // console.log([i,j])
      temp.push([i, j, ""]);
    }
    initialTable.push(temp);
  }
  // console.log(initialTable)

  const [table, setTable] = useState(initialTable);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [history, setHistory] = useState([]);
  const [isMoving,setIsMoving] = useState(false)
  const [isReplay, setIsReplay] = useState(false)
  const [showWaitingMessage, setShowWaitingMessage] = useState(false);

  const resetGame = () => {
    console.log("resetGame")
    // Auto reset
    // window.location.reload()

    // manual reset
    setTable(initialTable);
    setPlayerTurn(true);
    setIsEnd(false);
    setHistory([])
    setIsMoving(false)
    setIsReplay(false)
    setShowWaitingMessage(false)

    //close Modal
    document.getElementById('post_game_modal').close()

    toast.info("Game has been reset")
  }

  const handleMove = (row, col, mark = "X") => {
    setShowWaitingMessage(false)
    setIsMoving(true)
    // update table
    let temp = [...table];
    temp[row][col].splice(2, 1, mark);
    setTable(temp);
    setHistory([...history,[col,row,mark]])

    checkWinner(row, col)
    setIsMoving(false)
  };

  let scoreCount = 1;
  //TODO: highligh all the winning tiles(red background!?)
  // store co-od  when score count change OR made it {score, [coodArray,[], ...]}
  // let winCoodArray = [] 

  const isWin = () => {
    if (scoreCount >= rule) {
      console.log(`Player ${playerTurn ? "X" : "O"} Wins`);
      setIsEnd(true);

      document.getElementById('post_game_modal').showModal()
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
      if (row + i >= x) {
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
      if (col + i >= y) {
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
      if (row + i >= x || col + i >= y) {
        break;
      }

      //run count
      if (table[row + i][col + i][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    if(isWin()) {
      return true;
    }

    // upper-right
    for (let i = 1; i < rule; i++) {
      //catch out of bound error
      if (row - i < 0 || col + i >= y) {
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
      if (row + i >= x || col - i < 0) {
        break;
      }

      //run count
      if (table[row + i][col - i][2] == currentMove) {
        scoreCount += 1;
      } else {
        break;
      }
    }
    if(isWin()) {
      return true;
    }

    return false
  };

  const checkWinner = (row, col) => {
    const currentMove = table[row][col][2];

    verticalCheck(row, col, currentMove) ? toast.success("winner found")
    : horizontalCheck(row, col, currentMove) ? toast.success("winner found")
    : crossCheck(row, col, currentMove) ? toast.success("winner found")
    : setPlayerTurn(!playerTurn)
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
    // Set a delay of 2 seconds
    const timer = setTimeout(() => {
      setShowWaitingMessage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [history]);

  // console.log(history)

  return (
    <Gamecontext.Provider value={{ params, table, handlePlay, isEnd, history, playerTurn, resetGame, showWaitingMessage }}>
      {children}
    </Gamecontext.Provider>
  );
}

export const useGameContext = () => useContext(Gamecontext)