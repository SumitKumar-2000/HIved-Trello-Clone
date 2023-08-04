"use client"
import "@/style/board.css"
import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";

const BoardNav = ({boardName, taskListCount}) => {

  const [query, setQuery] = useState(false)  

  return (
    <nav className="w-full h-[40px] flex_between">
      {query ? (
        <span className={`boardName_head`}>
        {boardName}
          <span className="ml-2 font-normal text-sm text-black dark:text-white">
            ({taskListCount})
          </span>
        </span>
        ) : (
          <input 
              type="search" 
              placeholder="Search tasklist..."
              className={`searchbar_input`}
          />
      )}  
      <button 
          type="button"
          onClick={()=>setQuery(prev => !prev)}
      >
          <BsFilter className="searchbar_btn"/>
      </button>
    </nav>
  );
};

export default BoardNav;
