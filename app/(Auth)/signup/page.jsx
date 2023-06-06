import Link from 'next/link'
import React from 'react'
import { BsAt, BsFillPersonFill, BsFillShieldLockFill } from 'react-icons/bs'

const SignUp = () => {
  return (
    <section className='w-full h-[90vh] flex_center'>
      <div className='w-full h-full bg-white border-2 border-black rounded-md flex_center gap-10 md:gap-14 flex-col p-4 relative'>
        <div>
          <h1 className='text-[#151718] font-extrabold text-2xl md:text-3xl text-center'>
            SIGN UP            
          </h1>
          <div className="text-xs text-black font-light max-w-lg md:text-center">
            Let&#39;s get started by creating your account
          </div>
        </div>
        <form className='w-full md:max-w-xl flex_center flex-col gap-6 md:gap-9'>
          <div className='w-full flex_center gap-1 relative'>
            <BsFillPersonFill className="text-[#151718] absolute top-auto left-2"/>
            <input 
              type="text" 
              placeholder='Name'
              className="auth_input"
            />
          </div>
          <div className='w-full flex_center gap-1 relative'>
            <BsAt className="text-[#151718] absolute top-auto left-2"/>
            <input
              type="email"
              placeholder="Email"
              className="auth_input"
            />
          </div>
          <div className='w-full flex_center gap-1 relative'>
            <BsFillShieldLockFill className="text-[#151718] absolute top-auto left-2"/>
            <input 
              type="password" 
              placeholder="Password"
              className="auth_input"
            />
          </div>
          <div className='w-full flex_center gap-1 relative'>
            <BsFillShieldLockFill className="text-[#151718] absolute top-auto left-2"/>
            <input 
              type="password" 
              placeholder="Confirm Password"
              className="auth_input"
            />
          </div>

          <button type="submit" className="auth_btn mt-6">Sign Up</button>

          <div className='text-[#151718] max-sm:text-sm'>
            Already have an account? <Link href="/signin" className='font-bold hover:underline'>Sign In</Link>
          </div>
        </form>
        <div className='text-[#151718] text-xs md:text-sm text-center absolute bottom-2 px-4'>
          Your data is safe and will be encrypted, we do not share it with anyone.
        </div>
      </div>
    </section>
  )
}

export default SignUp

