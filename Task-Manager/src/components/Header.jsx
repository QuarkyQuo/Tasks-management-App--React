import React from "react";
import logo from "../assets/logo-mobile.svg"
import iconDown from "../assets/icon-chevron-down.svg"
import iconUp from "../assets/icon-chevron-up.svg"
import ellipsis from "../assets/icon-vertical-ellipsis.svg"
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useSelector,useDispatch } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

export default function Header({boardModalOpen,setBoardModalOpen})
{
    const boards = useSelector((state) => state.boards)
    const board = boards.find(board => board.isActive);
    const [isElipsisOpen,setIsElipsisOpen] =React.useState(false)
    const [openDropdown, setOpenDropdown] =React.useState(false)
    const [boardType,setBoardType] =  React.useState('add')
    const [openAddEditTask,setOpenAddEditTask]= React.useState(false)
    const [isDeleteModalOpen,setIsDeleteModalOpen] = React.useState(false)
    const dispatch =useDispatch()
    const setOpenEditModal=()=>{
      setBoardType('edit')
      setBoardModalOpen(true);
      setIsElipsisOpen(false);
    }
    const setOpenDeleteModal=()=>{
      setIsDeleteModalOpen(true);
      setIsElipsisOpen(false);
    }

    const onDeleteBtnClick=()=>{
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({index:0}))
      setIsDeleteModalOpen(false)
    }

  return(
      <div className="p-4 fixed z-50 left-0 bg-white dark:bg-[#2b2c37] right-0">
          <header className="flex justify-between dark:text-white">

              {/* left side */}
              <div className="flex items-center space-x-2 md:space-x-4">

                  <img src={logo} alt="logo" className="w-6 h-6" />
                  <h3 className="hidden md:inline-block font-bold font-sans md:text-2xl text-[#635FC7] ">BOARDS</h3>

                  <div className="flex items-center cursor-pointer" onClick={() => setOpenDropdown(state => !state)}>
                      <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-regular md:ml-20 font-sans">
                      {board.name}
                      </h3>
                      <img src={openDropdown ? iconUp : iconDown} className="w-3 ml-2 md:hidden" alt="dropdown icon"
                           />
                  </div>
              </div>

              {/* Right side */}
              <div className="flex space-x-4 items-center md:space-x-6">
              <button className="button text-sm hidden md:block" 
              onClick={(e)=>{setOpenDropdown(false);
                setOpenAddEditTask(true)}}>
                + Add New Task
              </button>
              <button className="button w-9 h-9 rounded-full px-3 py-0 md:hidden font-bold "
              onClick={(e)=>{
                setOpenDropdown(false);
                setOpenAddEditTask(true)}}>
                +
              </button>
              <img src={ellipsis} alt="elipsis" className="cursor-pointer h-4"
              onClick={(e)=>{
                setOpenDropdown(false);
                setBoardType('edit');
                setIsElipsisOpen(!isElipsisOpen);
              }}/>
              {isElipsisOpen&& <ElipsisMenu type='Boards' setOpenEditModal={setOpenEditModal} setOpenDeleteModal={setOpenDeleteModal}/>}
              </div>
          </header>
        {openDropdown&&<HeaderDropdown setOpenDropdown={setOpenDropdown} setBoardModalOpen={setBoardModalOpen} setBoardType={setBoardType}/>}
        {boardModalOpen&&<AddEditBoardModal type={boardType} setBoardModalOpen={setBoardModalOpen}/>}
        {openAddEditTask&&<AddEditTaskModal device='mobile' type="add" setOpenAddEditTask={setOpenAddEditTask}/>}
        {isDeleteModalOpen&& <DeleteModal type='board' title={board.name} setIsDeleteModalOpen={setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick} />}
      </div>
  )
}