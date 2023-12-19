import React, { useEffect, useState } from 'react'
import { shuffle } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Task from '../modals/Task';
import boardsSlice from '../redux/boardsSlice';
function Column({colIndex}) {
    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-green-500",
        "bg-indigo-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-sky-500",
      ];
      const dispatch = useDispatch();
      const [color, setColor] = useState(null)
      const boards = useSelector(state => state.boards);
      const board = boards.find(board => board.isActive===true);
      const col = board.columns.find((col, i) => i === colIndex);

      useEffect(() => {
        setColor(shuffle(colors).pop())
      }, [dispatch]);
  return (
    <div
    className='scrollbar-hide mx-5 pt-[90px] min-w-[280px]'
    >
        <p
        className='font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2rem] text-[#828fa3]'>
        <span className={`rounded-full w-4 h-4 ${color}`}></span>
        {col.name} ({col.tasks?col.tasks.length:"0"})
        </p>
        {col?.tasks?.map((task,index)=>{
            return(
                <Task key={index} taskIndex={index} colIndex={colIndex}/>
            )
        })}
    </div>
  )
}

export default Column