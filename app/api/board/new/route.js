import { connectToDB } from "@/config/MongoDb";
import Board from "@/models/Board";
import User from "@/models/User";

export const POST = async (req) => {
    const {userId, title, description} = await req.json();
    
    try {
        await connectToDB();
        
        const user = await User.findById(userId)
        if(!user) return new Response("User with the requested Id not found!",{status:401})
        
        const newBoard = await new Board({
            creator: userId,
            title: title,
            description: description,
            taskLists: [],
        })

        await newBoard.save();
        return new Response(JSON.stringify(newBoard),{status:201});

    } catch (error) {
        console.log("board post error: ",error);
        return new Response("Failed to create new Board",{status: 500})
    }
}

