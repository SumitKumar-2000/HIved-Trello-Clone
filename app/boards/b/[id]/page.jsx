"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const Board = ({params}) => {

  const {data:session} = useSession({
    required: true,
        onUnauthenticated() {
            redirect("/")
        }
  })  

  return (
    <div>
      {params.id}
    </div>
  )
}

export default Board
