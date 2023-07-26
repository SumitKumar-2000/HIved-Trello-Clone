import { connectToDB } from "@/config/MongoDb";
import Board from "@/models/Board";


export const POST = async (request, {params}) => {
    try {
        await connectToDB();
        const {boardId, taskListId} = await params;
        const {title, description,image} = await request.json();

        const board = await Board.findById(boardId);
        if (!board) {
            return new Response("board not found",{status: 404});
        }
        
        const taskList = await board.taskLists.id(taskListId);
        if (!taskList) {
            return new Response("Tasklist not found",{status: 404});
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

export const GET = async (request, {params}) => {
    try{
        const {boardId, taskListId} = await params;

    } catch(error){
        console.log("task card get error: ",error);
        return new Response("Internal Server Error",{status: 500})
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        const {boardId, taskListId} = params;

        const board = await Board.findById(boardId);

        if(!board) return Response("Board not found",{status: 404})
        
        // finding taskList index
        const taskListIndex = await board.taskLists.findIndex((taskList) => taskList._id.toString() === taskListId.toString());

        if(taskListIndex === -1) return new Response("Task List not found",{status: 404});

        await board.taskLists.splice(taskListIndex,1);

        await board.save();

        return new Response("Task list successfully deleted",{status:200});

    } catch (error) {
        console.log("error: ",error);
        return new Response("Internal Server Error",{status:500})
    }
}