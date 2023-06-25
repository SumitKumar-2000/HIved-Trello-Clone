import { connectToDB } from "@/config/MongoDb";
import Board from "@/models/Board";

export const POST = async (request, { params }) => {
  const {listTitle} = await request.json();
  
  try {
    await connectToDB();
    const board = await Board.findById(params.boardId);
    if (!board) {
      return new Response("Board not found",{status:401});
    }

    const taskList = {
        title: listTitle,
        tasks: []
    }
    
    board.taskLists.push(taskList);
    await board.save();

    return new Response(JSON.stringify(board),{status:200})

  } catch (error) {
    console.log("error: ", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET = async (request, {params}) => {
  
  try {
    await connectToDB()
    const board = await Board.findById(params.boardId)
    if(!board){
      return new Response("Board not found",{status:401})
    }

    return new Response(JSON.stringify(board),{status:200})
  } catch (error) {
    console.log("error: ",error);
    return new Response("Internal Server Error",{status: 500})
  }
}