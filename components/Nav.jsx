"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsKanban, BsPersonCircle, BsSearch } from "react-icons/bs";

// next-auth imports
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Image from "next/image";

const Nav = () => {

  const {data: session} = useSession();
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    (async () => {
        const providerResponse = await getProviders();
        setProviders(providerResponse)
    })()
  },[])

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
            {session?.user ? (
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
                        {session?.user.image ? ( 
                            <Image
                                src={session?.user.image}
                                alt="User Img"
                                width={24}
                                height={24}
                                className="cursor-pointer rounded-full object-cover"
                            />
                        ) : (
                            <BsPersonCircle 
                                className="w-full h-full text-[#151718] cursor-pointer hover:text-white transition-all duration-200"
                            />
                        )}
                        <div className={`dropdown ${isHovered?"scale-[100%]":"scale-[0%]"}`}>
                            <Link href="/" className="dropdown_link">Profile</Link>
                            <div 
                                onClick={()=>signOut()}
                                className="dropdown_link cursor-pointer"
                            >   
                                Sign Out
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                  {
                    providers && Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={()=>signIn(provider.id)}
                            className="dark_btn"
                        >
                            Sign In
                        </button>
                    ))
                  }  
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav
