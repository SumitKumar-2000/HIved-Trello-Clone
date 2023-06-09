"use client"
import Link from 'next/link'
import React from 'react'
import { BsAt, BsFillShieldLockFill } from 'react-icons/bs'

// react-hook-form imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema} from '@/ValidationSchema/authValidationSchema'

// appwrite imports
// import { account } from '@/config/appwrite'
// import { ID } from 'appwrite'

const SignUp = () => {

  const {register, handleSubmit,reset, formState:{errors}} = useForm({
    resolver: yupResolver(signInSchema)
  }); 

  const handleFormSubmit = async (data) =>{
    console.log("signUp data: ",data);

    // await account.create(
    //   // ID.unique(),
    //   data.email,
    //   data.password,
    //   data.fullName
    // )

    reset();
  }

  return (
    <section className='w-full h-[90vh] flex_center'>
      <div className='w-full h-full bg-white border-2 border-black rounded-md flex_center gap-10 md:gap-14 flex-col p-4 relative'>
        <div>
          <h1 className='text-[#151718] font-extrabold text-2xl md:text-3xl text-center'>
            SIGN IN            
          </h1>
          <div className="text-xs text-black font-light max-w-lg md:text-center">
            Let&#39;s continue to your account
          </div>
        </div>
        <form 
          onSubmit={handleSubmit(handleFormSubmit)}
          className='w-full md:max-w-xl flex_center flex-col gap-4 md:gap-9'
        >
          <div className="w-full">
            <div className='w-full flex_center gap-1 relative'>
              <BsAt className="text-[#151718] absolute top-auto left-2"/>
              <input
                type="email"
                placeholder="Email"
                className="auth_input"
                {...register("email")}
                />
            </div>
            <p className="text-red-400 text-xs md:text-sm mt-1 ">{errors.email?.message}</p>
          </div>
          <div className="w-full">
            <div className='w-full flex_center gap-1 relative'>
              <BsFillShieldLockFill className="text-[#151718] absolute top-auto left-2"/>
              <input 
                type="password" 
                placeholder="Password"
                className="auth_input"
                {...register("password")}
                />
            </div>
            <p className="text-red-400 text-xs md:text-sm mt-1 ">{errors.password?.message}</p>
          </div>

          <button type="submit" className="auth_btn mt-6">Sign In</button>

          <div className='text-[#151718] max-sm:text-sm'>
            Don&#39;t have an account? <Link href="/signup" className='font-bold hover:underline'>Sign Up</Link>
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

