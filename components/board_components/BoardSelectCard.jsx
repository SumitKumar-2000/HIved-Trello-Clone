import "@/style/board.css"
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const BoardSelectCard = ({boardId, boardTitle, boardDescription}) => {

  return (
    <div className='select_board_card flex flex-col gap-3'>
        
        <div className="select_board_card_title">
            {boardTitle}
        </div>
        <button className='select_board_card_button'>
            <Link href={`/boards/b/${boardId}?title=${boardTitle}`}>Visit</Link>
            <BsArrowRight/>
        </button>
    </div>
  )
}

export default BoardSelectCard
