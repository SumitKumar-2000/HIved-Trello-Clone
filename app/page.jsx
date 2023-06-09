"use client"
import "@/style/homePage.css"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSession, getProviders, signIn } from "next-auth/react"

const Home = () => {

  const {data: session} = useSession()
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    (async () => {
        const providerResponse = await getProviders();
        setProviders(providerResponse)
    })()
  },[])

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
                <>
                  {
                    providers && Object.values(providers).map((provider) => (
                      <button 
                        type="button"
                        key={provider.name}
                        onClick={()=>signIn(provider.id)}
                        className="auth_dark_btn mt-4"
                      >
                        Sign In
                      </button>
                    ))
                  }
                </>
                )
            }
          </div>
        </div>

        <div className="w-full flex_center md:w-[50%]">
          <Image 
            src="/kanban.svg"
            alt="banner"
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
