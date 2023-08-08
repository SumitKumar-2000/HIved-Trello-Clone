"use client"
import "@/style/board.css"
import { BsXLg } from "react-icons/bs"
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import BoardNav from '@/components/board_components/BoardNav'
import TaskList from "@/components/board_components/taskList_components/TaskList"

const Board = ({params}) => {
  const {data:session} = useSession({
    required: true,
        onUnauthenticated() {
            redirect("/")
        }
  })

  const searchParams = useSearchParams()  
  const boardName = searchParams.get("title")

  const [listTitle, setListTitle] = useState("");
  const [addList,setAddList] = useState(false);
  const [taskListData, setTaskListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")

  const handleListFormSubmit = async (e) =>{
    setLoading(true);
    e.preventDefault();
    const response = await fetch(`/api/board/new/${params?.id}/tasklist`,{
      method: "POST",
      body: JSON.stringify({ 
        listTitle : listTitle 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // fetching again all lists to view the updated task list
    const fetchedResposne = await fetch(`/api/board/new/${params?.id}/tasklist`)
    const data = await fetchedResposne.json();
    setTaskListData(data)
    
    setLoading(false);
    setAddList(false)
  }
  
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/board/new/${params?.id}/tasklist?q=${searchQuery}`) 
      const data = await response.json();
      setTaskListData(data)
    })()
  },[searchQuery])

  const handleTaskListDelete = async (taskListId) =>{
    
    const hasComfirm = confirm("Are you sure, you want to delete this Task List ?")
    
    if(hasComfirm){
      try {
        const updatedTaskLists = taskListData.filter(taskList => taskList._id !== taskListId)
        setTaskListData(updatedTaskLists);
    
        await fetch(`/api/board/new/${params?.id}/tasklist/${taskListId}/tasks`,{
          method: "DELETE",
        })  
      } catch (error) {
        console.log("task list delete error: ",error);
      }
    }
  }

  return (
    <section className='w-full'>
      <BoardNav 
        boardName={boardName}
        taskListCount={taskListData.length}
        setSearchQuery={setSearchQuery}
      />
      <div className='list_container h-[84vh] scrollbar-thin scrollbar-track-black/20 scrollbar-thumb-black/80 dark:scrollbar-thumb-white/80'>
        {
          taskListData.length !== 0 ? taskListData.map((taskList) => {
            return (
              <TaskList
                key={taskList._id}
                taskList={taskList}
                boardId={params?.id}
                setTaskListData={setTaskListData}
                handleTaskListDelete={handleTaskListDelete}
              />
            )
          }) : null
        }
        {!addList ? (
          <button 
            onClick={()=>setAddList(true)}
            className="addList_btn flex_center"
          >
            Add List
          </button>
        ) : (
          <form 
            onSubmit={handleListFormSubmit}
            className="addList_form flex flex-col gap-2"
          >
            <input 
              required
              type="text" 
              maxLength="20"
              className="addList_formInput"
              placeholder="Enter List Title..."
              onChange={(e)=>setListTitle(e.target.value)}
            />
            <div>
            <span className="flex items-center gap-2">
              <button 
                type="submit"
                className="addList_formSubmit_btn" 
              >  
                {loading ? "Adding..." : "Add"} 
              </button>
              <BsXLg 
                onClick={()=>setAddList(false)}
                className="cursor-pointer"
              />
            </span>  
          </div>
          </form> 
        )}
      </div>
    </section>
  )
}

export default Board
