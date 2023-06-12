"use client"
import { useSession } from 'next-auth/react';
import React from 'react'
import { redirect } from 'next/navigation'

const Home = () => {

  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  })

  // console.log("session user",session?.user);

  return (
    <section>
      Protected page
    </section>
  )
}

export default Home
