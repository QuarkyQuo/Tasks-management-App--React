import React from "react";
import Header from "./components/Header";
import Center from "./components/Center";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import EmptyBoard from "./components/EmptyBoard";

export default function App() {
  const [boardModalOpen,setBoardModalOpen]= React.useState(false)
  const boards= useSelector(state => state.boards);
  const activeBoard= boards.find(board => board.isActive)
  const dispatch = useDispatch()

  if(!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({index:0}))
  }

  return (
    <div className="overflow-hidden overflow-x-scroll scrollbar-hide ">

      {boards.length?
        <>
              {/* Header Section */}
      <Header  boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen}/>
    {/* Center Section */}
      <Center boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen}/>
      </>:<>
        <EmptyBoard type="add"/>
      </>}

    </div>
  )
}