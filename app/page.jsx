"use client"
import "@/style/homePage.css"

const Home = () => {

  return (
    <section className="mx-auto max-w-[90rem] py-4 rounded-md transition-all duration-500">
      
      <div className="w-full flex max-sm:flex-col justify-between">
        
        <div className="flex flex-col gap-2 md:gap-4 mt-6 md:mt-10 w-full md:w-[40%]">  
          <h1 className="hived_head emereld_sky_gradient_text">Hived</h1>
          <h1 className="hived_sub_head">Let's you streamline your Tasks & Projects</h1>
          <p className="hived_desc">Empowering you to stay Organized, Focused, and Productive.</p>
          <div className="w-full flex items-center justify-center md:justify-start">
            {
              <button className="auth_dark_btn mt-4">
                Sign In
              </button>
            }
          </div>
        </div>

        <div className="w-full md:w-[40%]">
          
        </div>

      </div>
    </section>
  )
}

export default Home
