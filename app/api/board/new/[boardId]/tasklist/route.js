import { connectToDB } from "@/config/MongoDb";
import Board from "@/models/Board";

// api to add new tasklist
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

// fetching a board i.e. all board data
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

// api to delete a board
export const DELETE = async(request,{params}) => {
  try {
    await connectToDB();
    await Board.findByIdAndDelete(params.boardId);
    return new Response("Board Deleted Successfully",{status:200});
  } catch (error) {
    console.log("error: ",error);
    return new Response("Internal Server Error",{status: 500});
  }
} 