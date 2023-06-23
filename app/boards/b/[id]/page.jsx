"use client"
import "@/style/board.css"
import { useSession } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import BoardNav from '@/components/board_components/BoardNav'

const Board = ({params}) => {
  
  const searchParams = useSearchParams()  
  const boardName = searchParams.get("title")
  console.log("board Name: ",boardName);
  const {data:session} = useSession({
    required: true,
        onUnauthenticated() {
            redirect("/")
        }
  })  

  return (
    <section className='w-full'>
      <BoardNav boardName={boardName}/>
      <div className='list_container h-[84vh]'>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
        <div className="addList_btn flex_center">Add List</div>
      </div>
    </section>
  )
}

export default Board
