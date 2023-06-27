import "@/style/board.css"
import { BsThreeDotsVertical, BsPlusLg } from "react-icons/bs"

const TaskList = ({taskList}) => {
  return (
    <section className="taskList flex_center flex-col">
      <div className="w-full flex_between mb-4 pl-2">
        <span className="font-semibold">{taskList.title}</span>
        <button className="p-2 flex_center hover:bg-zinc-800 rounded-sm">
          <BsThreeDotsVertical className="cursor-pointer"/>
        </button>
      </div>
      <button 
        className="flex_left addCard_btn"
        onClick={()=>{}}
      >
        <BsPlusLg className="text-white dark:text-black" />
        <span>Add a card</span>
      </button>
    </section>
  )
}

export default TaskList
