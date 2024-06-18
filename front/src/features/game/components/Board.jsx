import React, { useContext } from 'react'
import { Gamecontext } from '../context/GameContext'
import Row from './Row'

function Board() {
    const {params, table} = useContext(Gamecontext)
    // console.log(params)
    // console.log(table)
    // table.map((el,i) => console.log(el,i))
   
  return (
    <div className='flex flex-col justify-between min-w-96 max-h-[calc(100vh-120px)] overflow-auto gap-1'>
      {table.map((el,i) => <Row key={i} item={el} index={i}/>)}
    </div>
  )
}

export default Board