import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SetupContext = createContext();

export default function SetupContextProvider({ children }) {
const navigate = useNavigate()
  const [row, setRow] = useState(3);
  const [col, setCol] = useState(3);
  const [gameRule, setGameRule] = useState(3);
  const [gameMode, setGameMode] = useState(true);

  const handleRow = (action = "increase", value) => {
    if (action == "increase" && row < 15) {
      setRow(row + 1);
    }
    if (action == "decrease" && row > 3) {
      setRow(row - 1);
    }
    if (action == "set") {
        if(+value) setRow(value);
    }
    if (action == "blur") {
        if(row > 15) {
            toast.info("row number must be less than 15")
            return setRow(15)
        }
        if(row < 3) {
            toast.info("row number must be more than 3")
            return setRow(3)
        }
    }
  };
  const handleCol = (action = "increase", value) => {
    if (action == "increase" && col < 15) {
      setCol(col + 1);
    }
    if (action == "decrease" && col > 3) {
      setCol(col - 1);
    }
    if (action == "set") {
        if(+value) setCol(value);
    }
    if (action == "blur") {
        if(col > 15) {
            toast.info("column number must be less than 15")
            return setCol(15)
        }
        if(col < 3) {
            toast.info("column number must be more than 3")
            return setCol(3)
        }
    }
  };

  const handleConfirm = () => {
    navigate(`/game/${row}/${col}/${gameRule}/${gameMode}`)
  }

  return (
    <SetupContext.Provider value={{ row, col, handleRow, handleCol, gameRule, setGameRule, gameMode, setGameMode, handleConfirm }}>
      {children}
    </SetupContext.Provider>
  );
}

export const useSetupContext = () => useContext(SetupContext);
