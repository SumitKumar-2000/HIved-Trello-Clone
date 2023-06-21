"use client"
import "@/style/board.css"
import Link from "next/link"

const BoardFrom = ({type,board,setBoard,submitting,handleFormSubmit}) => {

  const maxLength = 100;

  return (
    <section className='max-w-[90rem] mx-auto bg-transparent h-[90vh] mt-auto pt-8 md:pt-8'>
      <h1 className="emereld_sky_gradient_text text-4xl md:text-6xl font-extrabold">{type} Board</h1>

      <form
        onSubmit={handleFormSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 bg-[#f9f9f9] glassmorphism"
      >
        
        <label>
          <span className="font-semibold text-base text-[#151718] dark:text-white">
            Title <strong className="text-red-400">*</strong>
          </span>

          <input 
            type="text"  
            value={board.title}
            onChange={(e)=>setBoard({...board, title: e.target.value})}
            placeholder="Title"
            required
            className="form_input"
          />

        </label>

        <label>
          <span className="font-semibold text-base text-[#151718] dark:text-white">
            Description 
          </span>

          <span className="text-gray-600 text-xs md:text-sm ml-2">
            {`( ${board.description.length} / ${maxLength} )`}
          </span>

          <textarea 
            value={board.description}
            onChange={(e)=> setBoard({...board, description: e.target.value})}
            placeholder="Write board description here..."
            className="form_textarea"
            maxLength={maxLength}
          />

        </label>

        <div className="flex justify-end items-center mx-3 gap-4 mb-3">
          <Link href="/" className="text-gray-500 dark:text-white text-sm hover:text-black duration-500 transition-all">
            Cancel
          </Link>
          
          <button
            type="submit"
            disabled={submitting}
            className="px-5 rounded-full bg-orange-500 py-1.5 text-sm text-white hover:shadow-xl transition-all duration-500"
          >
            {submitting ?  `${type} ...` : `${type} Board`}
          </button>
        </div>

      </form>
    </section>
  )
}

export default BoardFrom
