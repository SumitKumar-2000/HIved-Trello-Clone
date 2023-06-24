import { connectToDB } from "@/config/MongoDb";
import Board from "@/models/Board";

export const GET = async (request, { params }) => {
  console.log("board Id: ", params.boardId);
  const {listTitle} = request.body;
  
  try {
    await connectToDB();
    const board = await Board.findById(params.boardId);
    console.log("board: ",board);
    console.log("board: ",board._id);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const taskList = {
        board: "board id",
        title: listTitle,
        tasks: []
    }
    
    board.taskLists.push(taskList);
    await board.save();

  } catch (error) {
    console.log("error: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
