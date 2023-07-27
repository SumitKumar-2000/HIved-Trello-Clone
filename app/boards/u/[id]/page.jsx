"use client"
import "@/style/board.css"
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import MoonLoader from '@/components/loaders/MoonLoader'
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
        })()
    },[])

    const handleDeleteBoard = async (boardId) =>{
        const hasConfirmed = confirm("Are you sure, you want to delete this board ?")
        if(hasConfirmed){
            try {
                const filteredBoard = boardsData.filter(board => board._id !== boardId)
                setBoardsData(filteredBoard)

                await fetch(`/api/board/new/${boardId}/tasklist`,{
                    method: "DELETE"
                })

            } catch (error) {
                console.log("Delete board error: ",error);
            }
        }
    }

  return (
    <section className="max-w-[90rem] mx-auto py-8 relative">

        {boardsData !== false ? (
            <div className="w-full">
                <h1 className="emereld_sky_gradient_text text-4xl md:text-6xl font-extrabold">Your Boards</h1>
                {boardsData.length === 0 && <h1 className="font-medium m-1">No board has been created yet!</h1>}
                <div className='w-full flex flex-wrap py-8 gap-4'>
                    {
                        boardsData?.length !== 0 && (
                            boardsData.map(board => {
                                return <BoardSelectCard 
                                    key={board._id}
                                    boardId={board._id}
                                    boardTitle={board.title}
                                    boardDescription={board.description}
                                    handleDeleteBoard={handleDeleteBoard}
                                />
                            })
                        )
                    }

                    <div className="select_board_card flex_between gap-3">
                        <div className='select_board_card_title'>
                            Create New Board    
                        </div>
                        <Link  
                            href={`/boards/new`}
                            className='create_board_btn flex_center'
                        >
                            Create +
                        </Link>
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
