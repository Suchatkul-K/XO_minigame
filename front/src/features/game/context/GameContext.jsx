import React, { createContext, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Gamecontext = createContext()

export default function GameContextProvider({children}) {
  const params = useParams()

  // console.log(params)
  // x,y,rule,type

  const{x,y} = params
  // console.log("xxxxx",x)
  // console.log("yyyyy",y)

  const initialTable = [];

  for(let j = 0; j < y;j++) {
    let temp = []
    for(let i = 0; i < x;i++) {
      // console.log([i,j])
      temp.push([i,j,""])
      }
      initialTable.push(temp)
  }
  // console.log(initialTable)

  const [table,setTable] = useState(initialTable)
  const [playerTurn, setPlayerTurn] = useState(true)

  const handleMove = (row,item,mark = "X") => {
    let temp = [...table]
    temp[row][item].splice(2,1,mark)
    // console.log(temp)
    setTable(temp)
  }

  const handlePlay = (row, item) => {
    // console.log(table[row][item])
    if(table[row][item][2] != "") {
      console.log("invalid move")
    } else {
      if(playerTurn) {
        handleMove(row,item)
        setPlayerTurn(false)
      } else {
        handleMove(row,item, "O")
        setPlayerTurn(true)
      }
    }
  }

  return (
    <Gamecontext.Provider value={{params, table, handlePlay}}>{children}</Gamecontext.Provider>
  )
}
