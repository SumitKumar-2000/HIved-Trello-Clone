"use client"
import "@/style/board.css"
import { useSession } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import BoardNav from '@/components/board_components/BoardNav'
import { useEffect, useState } from "react"
import { BsXLg } from "react-icons/bs"

const Board = ({params}) => {
  const searchParams = useSearchParams()  
  const boardName = searchParams.get("title")

  const [listTitle, setListTitle] = useState("")
  const [addList,setAddList] = useState(false)
  const [loading, setLoading] = useState(false)


  const {data:session} = useSession({
    required: true,
        onUnauthenticated() {
            redirect("/")
        }
  })  

  const handleListFormSubmit = async (e) =>{
    setLoading(true);
    e.preventDefault();
    const response = await fetch(`/api/board/new/${params?.id}/tasklist`,{
      method: "POST",
      body: JSON.stringify({ 
        listTitle : listTitle 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json();
    console.log("response data: ",data);
    setLoading(false);
    setAddList(false)
  }

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/board/new/${params?.id}/tasklist`) 
      const data = await response.json();
      console.log("data: ",data);
    })()
  },[])

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
              className="addList_formInput"
              placeholder="Enter List Title..."
              maxLength="20"
              onChange={(e)=>setListTitle(e.target.value)}
            />
            <div>
            <span className="flex items-center gap-2">
              <button 
                type="submit"
                className="addList_formSubmit_btn" 
              >  
                {loading ? "Adding..." : "Add"} 
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
