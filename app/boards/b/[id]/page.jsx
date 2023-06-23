"use client"
import "@/style/board.css"
import { useSession } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import BoardNav from '@/components/board_components/BoardNav'
import { useState } from "react"
import { BsXLg } from "react-icons/bs"

const Board = ({params}) => {
  
  const searchParams = useSearchParams()  
  const boardName = searchParams.get("title")

  const [addList,setAddList] = useState(false)

  const {data:session} = useSession({
    required: true,
        onUnauthenticated() {
            redirect("/")
        }
  })  

  const handleListFormSubmit = () =>{

  }

  return (
    <section className='w-full'>
      <BoardNav boardName={boardName}/>
      <div className='list_container h-[84vh]'>
        {!addList ? (
          <button 
            onClick={()=>setAddList(true)}
            className="addList_btn flex_center"
          >
            Add List
          </button>
        ) : (
          <form 
            onSubmit={handleListFormSubmit}
            className="addList_form flex flex-col gap-2"
          >
            <input 
              type="text" 
              placeholder="Enter List Title..."
              className="addList_formInput"
            />
            <div>
            <span className="flex items-center gap-2">
              <button 
                type="submit"
                className="addList_formSubmit_btn" 
                >  
                Add 
              </button>
              <BsXLg 
                onClick={()=>setAddList(false)}
                className="cursor-pointer"
              />
            </span>  
          </div>
          </form> 
        )}
      </div>
    </section>
  )
}

export default Board
