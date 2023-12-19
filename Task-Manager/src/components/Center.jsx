import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import AddEditBoardModal from "../modals/AddEditBoardModal";
export default function Center({boardModalOpen,setBoardModalOpen})
{
  const [windowSize,setWindowSize]= useState([
    window.innerWidth, window.innerHeight
  ])
  const boards = useSelector(state => state.boards);
  const board = boards.find(board => board.isActive===true);
  const columns = board.columns; 
  const [isSidebarOpen,setIsSidebarOpen] = useState(true)
  const [isBoardModalOpen,setIsBoardModalOpen] = useState(false)
  useEffect(() =>{
    const handleWindowResize=()=>{
      setWindowSize([window.innerWidth,window.innerHeight])
    }
    window.addEventListener("resize",handleWindowResize)
  })
  return(

  <div className={windowSize[0]>=768 && isSidebarOpen?`bg-[#f4f7fd] scrollbar-hide
  h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]`
  :`bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ` }>

    {windowSize[0]>=768 &&
      (<SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>)}
    
    { columns.length>0?(<>
      {/*Columns Section */}
    {
      columns.map((col,index) => {
      return (
        <Column key={index} colIndex={index}/>
        
        )
    })
  }
  <div
  onClick={() => {
    setIsBoardModalOpen(true);
  }}
  className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-semibold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
>
  + New Column
</div>
      </>)
      :(
        <>
        <EmptyBoard type="edit" />
      </>
      )
    }
    {isBoardModalOpen && (
      <AddEditBoardModal
        type="edit"
        setBoardModalOpen={setIsBoardModalOpen}
      />
    )} 
  </div>
  )
}