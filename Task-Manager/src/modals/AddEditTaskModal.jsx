import React from "react";
import {v4 as uuidv4} from 'uuid'
import boardsSlice from "../redux/boardsSlice";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";

export default function AddEditTaskModal({setOpenAddEditTask,device,type,prevColIndex=0,taskIndex,setIsTaskAddModalOpen}) {
    const [title, setTitle]=React.useState('')
    const [description, setDescription]=React.useState('')
    const [subtasks, setsubtasks]=React.useState(
        [
            {title:'', isCompleted:false,id:uuidv4()}
        ]
    )
    const dispatch=useDispatch()
    const board = useSelector(state=>state.boards).find(board => board.isActive)
    const columns= board.columns
    const col = columns.find((col, index) => index === prevColIndex);
    const task = col ? col.tasks?.find((task, index) => index === taskIndex) : [];
    const [status, setStatus]=React.useState(columns[prevColIndex].name)
    const [newColIndex,setNewColIndex]=React.useState(prevColIndex)
    const onChange= (id,newValue)=>{
        setsubtasks((prevValue)=>{
            const newState = [...prevValue]
            const subtask = newState.find((subtask) => subtask.id === id);
            subtask.title = newValue;
            return newState;
        })
    }
    const onDelete=(id)=>{setsubtasks((prev)=>prev.filter((subTask)=>subTask.id!==id))}
    const [isValid,setIsValid]= React.useState(false);
    const [isFirstLoad,setIsFirstLoad]= React.useState(true);
    if(isFirstLoad&&type==='edit'){
        setTitle(task.title)
        setDescription(task.description)
        setsubtasks(task.subtasks.map((subTask,index)=>{
            return({...subTask,id:uuidv4()})
        }))
        setStatus(task.status)
        setIsFirstLoad(false);
    }
    const onSubmit= (type)=>{
        setOpenAddEditTask(false);
        if(type==='add'){
           
            dispatch(boardsSlice.actions.addTask({
                    title, 
                    status, 
                    description, 
                    subtasks, 
                    newColIndex
                }
            ))
        }
        else if(type==='edit'){
            dispatch(boardsSlice.actions.editTask({              
                title,
                status,
                description,
                subtasks,
                prevColIndex,
                newColIndex,
                taskIndex,}))
        }
    }
        
    const validate =()=>{
        setIsValid(false);
        if(!title.trim()){
            return false;
        }
        for(let i=0;i<subtasks.length;i++){
            if(subtasks.length>0&& !subtasks[i].title.trim()){
            return false;
        }}
    
        setIsValid(true);
        return true
    }

  return (
      <div onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          setOpenAddEditTask(false)
      }}
          className={
              device === 'mobile' ? `px-6 py-auto absolute left-0
            flex right-0 bottom-[-100vh] top-0 bg-[#00000080] scrollbar-hide max-h-[100vh]`: `py-auto px-6 absolute
            overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080] scrollbar-hide`
          } >

          {/*Model Section */}

          <div className='scrollbar-hide overflow-y-scroll max-h-[80vh] my-auto
              bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
                shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl '>
              <h3 className='text-lg'>
                  {type === 'edit' ? 'Edit' : 'Add New'} Task
              </h3>

              {/*Task Name */}
              <div className="mt-8 flex flex-col space-y-1">
                  <label className="text-sm dark:text-white text-gray-500">
                      Task name
                  </label>
                  <input type="text" value={title} placeholder="e.g Take a Coffee break"
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm
                    border border-gray-600 focus:outline-[#635fc7] ring-0"/>
              </div>

              {/*Task Description */}
              <div className="mt-8 flex flex-col space-y-1">
                  <label className="text-sm dark:text-white text-gray-500">
                      Description
                  </label>
                  <textarea value={description} placeholder="e.g It's always good have a little coffee break. Have a 15 minute recess and enjoy your coffee break."
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm
                    border border-gray-600 focus:outline-[#635fc7] ring-0
                    min-h-[150px] scrollbar-hide"/>
              </div>

              {/* Sub Tasks*/}
              <div className="mt-8 flex flex-col space-y-3">
                  <label className='text-sm dark:text-white text-gray-500'>
                      Sub Tasks
                  </label>
                  {subtasks.map((subTask, index) => {
                      return (
                          <div key={index} className="flex items-center w-full">
                              <input type="text" className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border 
                    border-grey-600 focus:outline-[#635fc7] outline-1 ring-0 "
                                  value={subTask.title} onChange={(e) => onChange(subTask.id, e.target.value)}
                                  placeholder="e.g Make/Buy Coffee" />
                              <img className="cursor-pointer m-4" src={crossIcon} onClick={(e) => onDelete(subTask.id)} alt="Remove Icon" />
                          </div>
                      )
                  })}
              </div>
              <div>

              <button className="w-full items-center hover:opacity-75 dark:text-[#635fc7]
              dark:bg-white text-white bg-[#635fc7] py-2 mt-2 rounded-full" 
              onClick={(e)=>{
                setsubtasks(prev=>[...prev,{title:'',isCompleted:false,id:uuidv4()}])
              }}>
                + Add New Subtask
              </button>

              {/*Current Status Selection*/}
              <div className="mt-8 flex flex-col space-y-3">
                <label 
                className=" text-sm dark:text-white text-gray-500 "
                >
                    Current Status
                </label>
                <select 
                className="select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent
                focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none
                dark:text-white dark:bg-[#2b2c37]"
                value={status}
                onChange={(e)=>{
                    columns.forEach((col,index)=>{
                        if(e.target.value===col.name) {
                            setStatus(e.target.value)
                            setNewColIndex(index)}
                    })
                }}>
                    {columns.map((col,index)=>{
                        return(
                        <option
                        key={index}
                        className='dark:text-white dark:hover:bg-[#635fc7]'>
                            {col.name}
                        </option>
                        )
                    })}
                </select>
              </div>
              <button
              onClick={()=>{
                if(validate()) onSubmit(type)
              }}
             className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full mt-2">
                    {type==='edit'?'Save Edit':'Create Task'}
              </button>
          </div>
          </div>
      </div>
  )
    //return logic
  
}