"use client"
import Link from "next/link";
import { useState } from "react";
import { BsKanban, BsPersonCircle, BsPersonFillAdd, BsSearch } from "react-icons/bs";

const Nav = () => {

  const [isSignedIn, setSignedIn] = useState(false);  
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false)

  return (
    <nav className='px-4 md:px-8 py-4 md:py-4 flex_between w-full'>
       <Link href="/" className="flex_center gap-1 text-white cursor-pointer">
        <BsKanban className="h-[24px] md:h-[28px] w-[24px] md:w-[26px]"/>
        <div className="hidden md:block text-2xl">
            Hived
        </div>
       </Link> 

        <div>
            {isSignedIn ? (
                <div className="flex_center gap-2">
                    <div className="flex_center gap-1 py-1 px-2 md:px-3 border border-black bg-[#151718] rounded-full">
                        <BsSearch className="w-[12px] md:w-[14px] h-[12px] md:h-[14px] text-[#9299a4]"/>
                        <input 
                            type="search" 
                            value={searchQuery}
                            onChange={(e)=>setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none px-1 md:px-2 text-[12px] md:text-[14px] text-white"
                            placeholder="Search..."
                        />
                    </div>
                    <div 
                        className="flex_center w-[24px] h-[24px] md:w-[30px] md:h-[30px] relative"
                        onMouseEnter={()=>setIsHovered(true)}
                        onMouseLeave={()=>setIsHovered(false)}
                    >
                        <BsPersonCircle 
                            className="w-full h-full text-[#151718] cursor-pointer hover:text-white transition-all duration-200"
                        />
                        <div className={`dropdown ${isHovered?"scale-[100%]":"scale-[0%]"}`}>
                            <Link href="/" className="dropdown_link">Profile</Link>
                            <div className="dropdown_link cursor-pointer">SignOut</div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="max-sm:hidden flex_center gap-1 md:gap-2">
                        <Link 
                            href="/signin"
                            className="dark_btn"
                        >
                            Log In                    
                        </Link>
                        <Link 
                            href="/signup"
                            className="dark_btn"
                        >
                            Sign Up
                        </Link>
                    </div>
                    <div 
                        className="flex_center md:hidden w-[24px] h-[24px] md:w-[30px] md:h-[30px] relative"
                        onMouseEnter={()=>setIsHovered(true)}
                        onMouseLeave={()=>setIsHovered(false)}
                    >
                        <BsPersonFillAdd 
                            className="m-auto w-[80%] h-[80%] cursor-pointer text-white transition-all duration-200"
                        />
                        <div className={`dropdown ${isHovered?"scale-[100%]":"scale-[0%]"}`}>
                            <Link href="/signin" className="dropdown_link">Log In</Link>
                            <Link href="/signup" className="dropdown_link cursor-pointer">Sign Up</Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav
