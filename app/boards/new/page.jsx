"use client"
import "@/style/board.css"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import BoardFrom from '@/components/board_components/BoardFrom'
import { redirect, useRouter } from "next/navigation"

const CreateNewBoard = () => {

  const router = useRouter()

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

  const addNewBoard = async (e) =>{
    e.preventDefault();
    setSubmitting(true)
    const response = await fetch("/api/board/new",{
      method:"POST",
      body: JSON.stringify({
        userId: session?.user.id,
        title: board.title,
        description: board.description
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json()
    setSubmitting(false)
    router.push(`/boards/u/${session?.user.id}`)
    console.log("data: ",data);
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
