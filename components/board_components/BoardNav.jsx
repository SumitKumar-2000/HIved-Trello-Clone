"use client"
import "@/style/board.css"
import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";

const BoardNav = ({boardName, taskListCount, setSearchQuery}) => {

  const [query, setQuery] = useState(false) 

  let timeOutId;
  function handleSearchQuery(q,delay=500){
    clearTimeout(timeOutId)
    timeOutId = setTimeout(() => {
      setSearchQuery(q)
    }, delay);
  }

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
              onChange={(e)=>handleSearchQuery(e.target.value,1000)}
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
