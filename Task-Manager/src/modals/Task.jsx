import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TaskModal from '../components/TaskModal';

function Task({taskIndex,colIndex}) {
    const boards = useSelector(state=>state.boards)
    const board = boards.find(board=>board.isActive)
    const columns = board.columns;
    const col= columns?.find((col,i)=>i===colIndex)
    const task= col?.tasks?.find((task,i)=>i===taskIndex)
    const [isTaskModalOpen,setIsTaskModalOpen]= useState(false)

    let completed =0
    let subtasks=task?.subtasks
    subtasks?.forEach(subtasks=>{if(subtasks.isCompleted) completed++})
    const handleOnDrag=(e)=>{
      e.dataTransfer.setData(
        "text",
      JSON.stringify({taskIndex,prevColIndex:colIndex})
      )
    }
  return (
    <div>
    <div
    onDragStart={handleOnDrag}
    draggable
    onClick={(e)=> setIsTaskModalOpen(true)}
    className='w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37]
    shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7]
    dark:text-white dark:hover:text-[#6357c7] cursor-pointer'>
    <p
    className='font-bold tracking-wide'>
    {task?.title}
    </p>
    <p className='font-bold text-xs tracking-tighter mt-2 text-gray-500'>
    {completed} of {subtasks?subtasks.length:"0"} completed tasks</p>
    </div>
    {isTaskModalOpen&&<TaskModal
      taskIndex={taskIndex} 
      colIndex={colIndex}
      setIsTaskModalOpen={setIsTaskModalOpen}/>}
    </div>
  )
}

export default Task