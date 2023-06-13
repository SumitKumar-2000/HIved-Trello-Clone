"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Home = async () => {
  // console.log("session data: ",data);

  return (
    <section>
      Protected page
    </section>
  )
}

export default Home
