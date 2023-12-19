import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import {Switch} from "@headlessui/react"
import userDarkMode from "../Hooks/userDarkMode";
import boardsSlice from "../redux/boardsSlice";

export default function HeaderDropdown({setOpenDropdown,setBoardModalOpen,setBoardType})
{
    const [colorTheme,setTheme] = userDarkMode()
    const [darkSide, setDarkSide] = React.useState(colorTheme==='light'?true:false)
    const dispatch = useDispatch()
    const boards= useSelector(state=>state.boards)

    const toggleDarkMode= (checked) => {
        setTheme(colorTheme)
        setDarkSide(checked)
    }
  return(
  <div className="py-10 px-6 absolute left-0 bottom-[-100vh] top-16 bg-[#00000080] w-full" 
  onClick={
    (e)=>{
        if (e.target!==e.currentTarget) return;
        setOpenDropdown(false);
        // console.log("boards= ",boards)
    }
  }>
    {/* Dropdown Modal */}
    <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
        All boards ({boards?.length})
        </h3>
        <div>
        {boards.map((board,index) => {
            return(
            <div className={`flex items-center space-x-2 px-5 py-4 mr-6 cursor-pointer ${board
                .isActive && 'bg-[#635fc7] rounded-r-full text-white'} dark:text-white`} key={index}
                onClick={(e)=>{dispatch(boardsSlice.actions.setBoardActive({index}))}}>
                <img src={boardIcon} alt="board icon" className="h-4"/>
                <p className="text-lg font-semibold">
                    {board.name}
                </p>
            </div>
            )
        })}
        <div className="flex items-center space-x-2 px-5 cursor-pointer py-4 text-[#635fc7]"
        onClick={()=>{
            setBoardType('add');
            setOpenDropdown(false);
            setBoardModalOpen(true)}} >
            <img src={boardIcon} alt="board icon" className="h-4"/> 
            <p className="text-lg font-semibold">
            Create New Board
            </p>  
        </div>
        <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c]
        flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="Light icon" className="h-4"/>
            {/* Switch */}
            <Switch checked={darkSide} onChange={toggleDarkMode}
            className={`${darkSide?'bg-[#635fc7]':'bg-gray-200 '}
            relative inline-flex h-6 w-11 
            items-center rounded-full`}>
            <span className={`${darkSide?'translate-x-6':'translate-x-1'} inline-block
            h-4 w-4 transform rounded-full bg-white transition`}/>
            
            </Switch>

            <img src={darkIcon} alt="Light icon" className="h-4"/>

        </div>
        </div>
    </div>
  </div>
  )
}