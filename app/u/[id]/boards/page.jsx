"use client"
import MoonLoader from '@/components/loaders/MoonLoader'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import "@/style/board.css"
import BoardSelectCard from '@/components/board_components/BoardSelectCard'

const AllBoards = ({params}) => {

    const [boardsData, setBoardsData] = useState(false)
    const {data:session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/")
        }
    }) 

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/board/u/${params.id}`)
            const data = await response.json();
            setBoardsData(data)
            console.log("data: ",data);
        })()
    },[])

  return (
    <section className="max-w-[90rem] mx-auto py-8">
        {boardsData !== false ? (
            <div className="w-full">
                <h1 className="dark_head">Your Boards</h1>
                {boardsData.length === 0 && <h1 className="font-medium m-1">No board has been created yet!</h1>}
                <div className='w-full flex flex-wrap py-8 gap-4'>
                    {
                        boardsData?.length !== 0 && (
                            boardsData.map(board => {
                                return <BoardSelectCard 
                                    key={board._id}
                                    baordId={board._id}
                                    boardTitle={board.title}
                                    boardDescription={board.description}
                                />
                            })
                        )
                    }

                    <div className="select_board_card flex justify-center items-center gap-8">
                        <div className='text-xl'>
                            Create New Board    
                        </div>
                        <div className='h-full flex-1 rounded-md bg-white/5 text-white text-2xl flex_center'>
                            +
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="w-full flex_center">
                <span className='text-2xl font-bold mr-2'>Loading</span><MoonLoader/>
            </div>
        )}
    </section>
  )
}

export default AllBoards
