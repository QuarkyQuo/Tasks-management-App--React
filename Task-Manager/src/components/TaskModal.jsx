import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import ElipsisMenu from './ElipsisMenu';
import Subtask from './Subtask';
import boardsSlice from '../redux/boardsSlice';
import DeleteModal from '../modals/DeleteModal';
import AddEditTaskModal from '../modals/AddEditTaskModal';

function TaskModal({setIsTaskModalOpen,taskIndex,colIndex}) {
    const dispatch = useDispatch()
    const boards= useSelector(state=>state.boards)
    const board = boards.find(board => board.isActive)
    const columns = board.columns
    const col= columns?.find((col,i)=>i===colIndex)
    const task= col?.tasks?.find((task,i)=>i===taskIndex)
    const subTasks= task.subtasks
    let completed =0
    let subtasks=task?.subtasks
    subtasks?.forEach(subtasks=>{if(subtasks.isCompleted) completed++})

    const [status,sestStatus]= useState(task.status)
    const [newColIndex,setNewColIndex]= useState(columns.indexOf(col))
    const [elipsisMenuOpen,setElipsisMenuOpen]= useState(false)
    const [isDeleteModalOpen,setIsDeleteModalOpen]= useState(false)
    const [isTaskAddModalOpen,setIsTaskAddModalOpen]= useState(false)

    const setOpenEditModal= ()=>{
        setIsTaskAddModalOpen(true);
        setElipsisMenuOpen(false);
    }

    const setOpenDeleteModal= ()=>{
        setElipsisMenuOpen(false);
        setIsDeleteModalOpen(true)
    }
    const onClose= (e)=>{
        if (e.target !== e.currentTarget) {
            return;
          }
        dispatch(
            boardsSlice.actions.setTaskStatus({
                taskIndex,colIndex,newColIndex,status
            })
        )
        setIsTaskModalOpen(false)
    }
    const onDeleteBtnClick = (e)=>{
        if (e.target.textContent === "Delete") {
        dispatch(boardsSlice.actions.deleteTask({colIndex,taskIndex}))
        setIsTaskModalOpen(false);
        }else{
            setIsDeleteModalOpen(false);
        }
    }
  return (

      <div
        onClick={onClose}
          className='fixed right-0 left-0 top-0 px-2 py-2 overflow-scroll scrollbar-hide
            x-50 bottom-0 justify-center flex bg-[#00000080]'
      >
          {/*Modal Section */}
          <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white 
        dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl' >

              <div className='relative flex justify-between w-full items-center'>
                  <h1 className='text-lg'>
                      {task.title}</h1>
                  <img src={elipsis}
                  className='cursor-pointer h-6'
                  onClick={(e)=>{
                    setElipsisMenuOpen(state=>!state);
                  }}
                   alt="" />
                   {elipsisMenuOpen && <ElipsisMenu
                    setOpenEditModal={setOpenEditModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    type="Task"/>}
                   
              </div>
              <p className='text-gray-500 font-semibold tracking-wide text-sm pt-6'>
              {task.description}</p>
              <p className='pt-6 text-gray-500 tracking-widest text-sm'>
              Subtasks ({completed} of {subtasks.length})
              </p>
              {/* Subtasks Section */}
              <div className='mt-3 space-y-2'>
              {
                subtasks.map((subtask,index) =>{
                    return(
                        <Subtask
                        index={index}
                        taskIndex={taskIndex}
                        colIndex={colIndex}
                        key={index}/>
                    )
                })
              }
              </div>
                  {/*Current Status Section */}
    <div className='mt-8 flex flex-col space-y-3'>
    <label className='text-sm dark:text-white text-gray-500'>
    Current Status</label>
    <select className='select-status flex-grow px-4 py-2 rounded-md text-sm
    bg-transparent focus:border-0 border broder-gray-300 focus:outline-[#635f37] outline-none'
    value={status}
    onChange={(e)=>{
        sestStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }}>
    {columns.map((col, index) =>{
        return(
            <option key={index}
            className='status-option'
            >
            {col.name}
            </option>
        )
    })}
    </select>
    </div>
          </div>
          {isDeleteModalOpen&&(
            <DeleteModal
            onDeleteBtnClick={onDeleteBtnClick}
            title={task.title}
            type='task'/>
            )}
            {isTaskAddModalOpen&&(
                <AddEditTaskModal
                device='mobile' 
                type="edit" 
                setOpenAddEditTask={setIsTaskAddModalOpen}
                setIsTaskAddModalOpen={setIsTaskModalOpen}
                taskIndex={taskIndex}
                prevColIndex={colIndex}/>
                )}
      </div>
  )
}

export default TaskModal