import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskModal from '../components/TaskModal';
import boardsSlice from '../redux/boardsSlice';

function Task({taskIndex,colIndex}) {
    const boards = useSelector(state=>state.boards)
    const board = boards.find(board=>board.isActive)
    const columns = board.columns;
    const col= columns?.find((col,i)=>i===colIndex)
    const task= col?.tasks?.find((task,i)=>i===taskIndex)
    const [isTaskModalOpen,setIsTaskModalOpen]= useState(false)
    const dispatch = useDispatch()
    let completed =0
    let subtasks=task?.subtasks
    subtasks?.forEach(subtasks=>{if(subtasks.isCompleted) completed++})

    //on drag start
    const handleOnDrag=(e)=>{
      e.dataTransfer.setData(
        "text/drag-start",
      JSON.stringify({prevTaskIndex:taskIndex,prevColIndex:colIndex})
      )
    }
    //on drag over
    const handleOnDragOver =(e)=>{
      e.preventDefault()
      e.target.classList.add("opacity-20")
    }
    const handleOnDragLeave =(e)=>{
      e.preventDefault()
      e.target.classList.remove("opacity-20")
    }
    //on drag drop
    const handleOnDrop =(e)=>{
      const {prevColIndex,prevTaskIndex}=JSON.parse(
        e.dataTransfer.getData("text/drag-start")
      )
      e.target.classList.remove("opacity-20")
      if(colIndex!==prevColIndex||colIndex===prevColIndex&&prevTaskIndex!==taskIndex){
        dispatch(boardsSlice.actions.dragOverTask({colIndex,prevColIndex,prevTaskIndex,newTaskIndex:taskIndex}))
      }
    }
  return (
    <div>
    <div
    onDragStart={handleOnDrag}
    onDrop={handleOnDrop}
    onDragOver={handleOnDragOver}
    onDragLeave={handleOnDragLeave}
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