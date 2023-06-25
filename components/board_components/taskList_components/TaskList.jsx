import "@/style/board.css"
import { BsThreeDotsVertical, BsPlusLg } from "react-icons/bs"

const TaskList = ({taskList}) => {
  return (
    <section className="taskList flex_center flex-col">
      <div className="w-full flex_between mb-4 px-2">
        <span className="font-semibold">{taskList.title}</span>
        <BsThreeDotsVertical className="cursor-pointer"/>
      </div>
      <div className="flex_left addCard_btn">
        <BsPlusLg className="text-white dark:text-black" />
        <span>Add a card</span>
      </div>
    </section>
  )
}

export default TaskList
