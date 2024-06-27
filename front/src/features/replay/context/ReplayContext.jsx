import React, { createContext, useContext, useEffect, useState } from "react";
import * as replayApi from "../../../api/replay.js";
import { useAuth } from "../../user/context/UserContext.jsx";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ReplayContext = createContext();

export default function ReplayContextProvider({ children }) {
  const [replayList, setReplayList] = useState([]);
  const { authUser } = useAuth();

  // get user's replay list
  const getList = async () => {
    const res = await replayApi.getUserReplayList(authUser.id);
    // console.log(res.data)
    setReplayList(res.data.replayList);
    document.getElementById("replayModal").showModal();
  };

  // save this game
  const saveReplay = async (row, col, rule, type, gameHistory) => {
    const res = await replayApi.saveReplay({
      row,
      col,
      rule,
      type,
      gameHistory,
    });
    console.log("replay api", res.data);
  };

  const param = useParams();

  const [replay, setReplay] = useState({row: 0, column:0, rule: 3,type: true,gameHistory: []})

  // load replay
  useEffect(() => {
    if (param.id)
      replayApi
        .getReplay(param.id)
        .then((res) => {
          // console.log(res.data.replay);
          setReplay(res.data.replay)
        })
        .catch((err) => {
          toast.error(err.response?.data.message);
        });
  }, [param]);

  const [table, setTable] = useState([]);
  const [replayTurn, setReplayTurn] = useState(0);

  // Replay turn handle
  let history = replay.gameHistory
  const handleLastTurn = () => {
    if (replayTurn > 1) {
      const change = history.slice(replayTurn - 1, replayTurn);

      let temp = [...table];
      temp[change[0][1]][change[0][0]].splice(2, 1, "");
      setTable(temp);

      setReplayTurn(replayTurn - 1);
    }
  };

  const handleNextTurn = () => {
    if (replayTurn < history.length) {
      const change = history.slice(replayTurn, replayTurn + 1);

      let temp = [...table];
      temp[change[0][1]][change[0][0]].splice(2, 1, change[0][2]);
      setTable(temp);

      setReplayTurn(replayTurn + 1);
    }
  };

  // replay set up 
  useEffect(() => {

    // init table
    const initialTable = [];

    for (let j = 0; j < replay.row; j++) {
      let temp = [];
      for (let i = 0; i < replay.column; i++) {
        temp.push([i, j, ""]);
      }
      initialTable.push(temp);
    }

    // set up board history
    history = replay.gameHistory;
    for(let i = 0; i < history.length; i++) {
      initialTable[history[i][1]][history[i][0]].splice(2, 1, history[i][2]);
    }

    setTable(initialTable)
    setReplayTurn(history.length)
  }, [replay]);

  return (
    <ReplayContext.Provider value={{ getList, replayList, saveReplay, replay, table, replayTurn, handleLastTurn, handleNextTurn }}>
      {children}
    </ReplayContext.Provider>
  );
}

export const useReplay = () => useContext(ReplayContext);
