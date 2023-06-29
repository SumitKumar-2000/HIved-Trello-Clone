"use client"
import "@/style/board.css"
import { useState } from "react"
import { BsThreeDotsVertical, BsPlusLg, BsXLg } from "react-icons/bs"

const TaskList = ({taskList}) => {

  const [cardAdd, setCardAdd] =  useState(false)
  const [loading, setLoading] = useState(false)
  const [cardFormData, setCardFormData] = useState({
    title: "",
    description: "",
    image: "",
  })

  const handleCardAdd = (e) => {
    e.preventDefault();
    console.log("form data: ",cardFormData); 

    setCardAdd(false)
  }

  return (
    <section className="taskList flex_center flex-col scrollbar-none">
      <div className="w-full flex_between mb-4 pl-2">
        <span className="font-semibold">{taskList.title}</span>
        <button className="p-2 flex_center hover:bg-zinc-800 dark:hover:bg-white rounded-sm">
          <BsThreeDotsVertical className="cursor-pointer"/>
        </button>
      </div>
      {cardAdd ? (
        <form 
          onSubmit={handleCardAdd}
          className="addList_form flex flex-col gap-2"
        >
          <input 
            required
            type="text" 
            placeholder="Add title *"
            className="addList_formInput"
            value={cardFormData.title}
            onChange={(e)=>setCardFormData({...cardFormData, title: e.target.value})}
            />
          <textarea 
            type="text" 
            maxLength="60"
            placeholder="Add description"
            className="addList_formInput"
            value={cardFormData.description}
            onChange={(e)=>setCardFormData({...cardFormData, description: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Add image"
            className="addList_formInput"
            value={cardFormData.image}
            onChange={(e)=>setCardFormData({...cardFormData, image: e.target.value})}
          />
          <span className="flex items-center gap-2">
              <button 
                type="submit"
                className="addList_formSubmit_btn" 
              >  
                {loading ? "Adding..." : "Add"} 
              </button>
              <BsXLg 
                onClick={()=>setCardAdd(false)}
                className="cursor-pointer"
              />
            </span>
        </form>
      ) : (
        <button 
          className="flex_left addCard_btn"
          onClick={()=>setCardAdd(true)}
        >
          <BsPlusLg className="text-white dark:text-black" />
          <span>Add a card</span>
        </button>
      )}
    </section>
  )
}

export default TaskList
