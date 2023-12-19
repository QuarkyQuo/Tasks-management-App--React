import React from "react";
import {v4 as uuidv4} from 'uuid'
import boardsSlice from "../redux/boardsSlice";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch,useSelector } from "react-redux";

export default function AddEditBoardModal({setBoardModalOpen, type}) {
    const board = useSelector(state=>state.boards).find(board => board.isActive)
    const [name,setName]= React.useState('');
    const [newColumns,setNewColumns]= React.useState([
        {name:'Todo', tasks:[],id:uuidv4()},
        {name:'Doing', tasks:[],id:uuidv4()}
    ])
    const dispatch = useDispatch()
    const [isValid,setIsValid]= React.useState(false);
    const [isFirstLoad,setIsFirstLoad]= React.useState(true);

    if(isFirstLoad&&type==='edit'){
        console.log(isFirstLoad);
        setNewColumns(board.columns.map(col=>{ 
            return {...col,id:uuidv4()}
        }))
        setName(board.name);
        setIsFirstLoad(false);
    }

    const onSubmit= (type)=>{
        setBoardModalOpen(false);
        if(type==='add'){
            dispatch(boardsSlice.actions.addBoard({name,newColumns}))
        }
        else if(type==='edit'){
            dispatch(boardsSlice.actions.editBoard({name,newColumns}))
        }
    }
        
    const validate =()=>{
        setIsValid(false);
        if(!name.trim()){
            return false;
        }
        for(let i=0;i<newColumns.length;i++){
        if(!newColumns[i].name.trim()){
            return false;
        }}
    
        setIsValid(true);
        return true
    }
    const onChange= (id,newValue)=>{
        setNewColumns((prevValue)=>{
            const newState = [...prevValue]
            const column= newState.find((col)=> col.id===id)
            column.name= newValue
            return newState
        })
    }
    const onDelete=(id)=>{setNewColumns((prev)=>prev.filter((col)=>col.id!==id))}
  return (
      <div
          onClick={(e) => {
              if (e.target !== e.currentTarget) return;
              setBoardModalOpen(false)
          }}
          className="fixed right-0 left-0 top-0 bottom-0 px-2 py-2 overflow-scroll 
            scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]">

          {/* Modal Section */}

          <div className=" scrollbar-hide overflow-y-scroll bg-white dark:bg-[#2b2c37]
             max-h-[95vh] dark:text-white font-bold shadow-md shadow-[#364e7e1a] 
             max-w-md mx-auto w-full px-8 py-8 rounded-xl ">

              <h3 className="text-lg">
                  {type === 'edit' ? 'Edit' : 'Add New'} Board
              </h3>

              {/* Task Name */}
              <div className='mt-8 flex flex-col space-y-3'>
                  <label className='text-sm dark:text-white text-grey-500'>
                      Board Name
                  </label>
                  <input className="bg-transparent px-4 py-2 rounded-md text-sm border 
                        border-grey-600 focus:outline-[#635fc7] outline-1 ring-0 "
                      placeholder="e.g Web Design" type="text" id='board-name-input'
                      value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              {/* Board Columns*/}
              <div className="mt-8 flex flex-col space-y-3">
                  <label className='text-sm dark:text-white text-gray-500'>
                      Board Columns
                  </label>
                  {newColumns.map((column, index) => {
                      return (
                          <div key={index} className="flex items-center w-full">
                              <input type="text" className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border 
                        border-grey-600 focus:outline-[#635fc7] outline-1 ring-0 "
                                  value={column.name} onChange={(e) => onChange(column.id, e.target.value)} />
                              <img className="cursor-pointer m-4" src={crossIcon} onClick={(e) => onDelete(column.id)} alt="Remove Icon" />
                          </div>
                      )
                  })}
              </div>
              <div>
                  <button className="w-full items-center hover:opacity-75 dark:text-[#635fc7]
                  dark:bg-white text-white bg-[#635fc7] py-2 mt-2 rounded-full" 
                  onClick={(e)=>{
                    setNewColumns(prev=>[...prev,{name:'',tasks:[],id:uuidv4()}])
                  }}>
                    + Add New Column
                  </button>
              </div>
              <div>
              <button className="w-full items-center hover:opacity-75 dark:text-white
              dark:bg-[#635fc7] text-white bg-[#635fc7] py-2 mt-8 rounded-full"
              onClick={()=>{
                if(validate()) onSubmit(type)
              }}>
                {type === 'add' ? 'Create New Board' : 'Save Changes'}
              </button>
          </div>
          </div>
      </div>
  )
}