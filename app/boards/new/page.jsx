"use client"
import "@/style/board.css"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import BoardFrom from '@/components/board_components/BoardFrom'
import { redirect } from "next/navigation"

const CreateNewBoard = () => {
  const {data: session} = useSession({
    required: true,
        onUnauthenticated() {
            redirect("/")
        }
  })  

  const [submitting, setSubmitting] = useState(false)
  const [board, setBoard] = useState({
    title: "",
    description: ""
  })

  const addNewBoard = (e) =>{
    e.preventDefault();

  }

  return (
    <BoardFrom
      type="Add New"
      board={board}
      setBoard={setBoard}
      submitting={submitting}
      handleFormSubmit={addNewBoard}
    />
  )
}

export default CreateNewBoard
