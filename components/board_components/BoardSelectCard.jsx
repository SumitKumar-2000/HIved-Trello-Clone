import React from 'react'
import "@/style/board.css"
import { BsArrowRight } from 'react-icons/bs'

const BoardSelectCard = ({boardTitle, boardDescription}) => {
  return (
    <div className='select_board_card gap-3'>
        <div>
            <div className="select_board_card_title">
                {boardTitle}
            </div>
            <div className="select_board_card_description">
                {boardDescription}
            </div>
        </div>
        <button className='select_board_card_button'>
            <span>Visit</span>
            <BsArrowRight/>
        </button>
    </div>
  )
}

export default BoardSelectCard
