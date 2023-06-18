"use client"
import "@/style/homePage.css"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const Home = () => {

  const {data: session} = useSession()

  return (
    <section className="mx-auto max-w-[90rem] py-4 rounded-md transition-all duration-500">
      
      <div className="w-full flex max-sm:flex-col justify-between">
        
        <div className="flex flex-col gap-2 md:gap-4 mt-6 md:mt-10 w-full md:w-[40%]">  
          <h1 className="hived_head emereld_sky_gradient_text">Hived</h1>
          <h1 className="hived_sub_head">Let's you streamline your Tasks & Projects</h1>
          <p className="hived_desc">Empowering you to stay Organized, Focused, and Productive.</p>
          <div className="w-full flex items-center justify-start md:justify-start">
            { session?.user ? (
                <Link href={`/boards/u/${session?.user.id}`} className="auth_dark_btn mt-4">
                  Your Boards
                </Link>
              ) : (
                <button className="auth_dark_btn mt-4">
                  Sign In
                </button>
              )
            }
          </div>
        </div>

        <div className="w-full flex_center md:w-[50%]">
          <Image 
            src="/kanban.svg"
            width={800}
            height={800}
            className="object-cover mt-8 animate-pulseSlowly"
          />
        </div>

      </div>
    </section>
  )
}

export default Home
