import { connectToDB } from "@/config/MongoDb";
import Board from "@/models/Board";


export const POST = async (request, {params}) => {
    try {
        await connectToDB();
        const {boardId, taskListId} = await params;
        console.log("boardId: ",boardId," ","taskListId: ",taskListId);
        const {title, description,image} = await request.json();
        console.log("title: ",title," ","description: ",description,"image: ",image);

        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }
        
        const taskList = await board.taskLists.id(taskListId);
        if (!taskList) {
            return res.status(404).json({ error: 'Task list not found' });
        }

        const task = {title:title, description:description, image: image}
        taskList.tasks.push(task)

        await board.save();

        return new Response(board,{status: 200})

    } catch (error) {
        console.log("error: ",error);
        return new Response("Internal Server Error",{status: 500})
    }
}

export const GET = async (request) => {
    try{

    } catch(error){
        console.log("task card get error: ",error);
        return new Response("Internal Server Error",{status: 500})
    }
}