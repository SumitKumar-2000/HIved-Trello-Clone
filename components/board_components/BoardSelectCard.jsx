import React from 'react'
import "@/style/board.css"
import { BsArrowRight } from 'react-icons/bs'

const BoardSelectCard = ({boardId, boardTitle, boardDescription}) => {
  return (
    <div className='select_board_card flex flex-col gap-3'>
        
        <div className="select_board_card_title">
            {boardTitle}
        </div>
        <button className='select_board_card_button'>
            <span>Visit</span>
            <BsArrowRight/>
        </button>
    </div>
  )
}

export default BoardSelectCard
