"use client"
import "@/style/board.css"
import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";

const BoardNav = ({boardName, taskListCount}) => {

  const [query, setQuery] = useState(false)  

  return (
    <nav className="w-full h-[40px] flex_between">
      <span className={`${query?"max-sm:w-0 max-sm:hidden":"w-full"} boardName_head`}>
        {boardName}
        <span className="ml-2 font-normal text-sm text-black dark:text-white">
          ({taskListCount})
        </span>
      </span>  
      <span className="searchbar_container flex_right gap-1">
        <input 
            type="search" 
            placeholder="Search tasklist..."
            className={`searchbar_input ${query ? "w-full" : "w-0"} `}
        />
        <button 
            type="button"
            onClick={()=>setQuery(prev => !prev)}
        >
            <BsFilter className="searchbar_btn"/>
        </button>
      </span>
    </nav>
  );
};

export default BoardNav;
