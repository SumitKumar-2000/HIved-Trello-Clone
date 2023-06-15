import { connectToDB } from "@/config/MongoDb";
import Board from "@/models/Board";

export const GET = async ({params}) => {
    try {
        await connectToDB();
        const boards = await Board.find({creator: params.id}).populate("creator");
        
        if(boards.length === 0) return new Response(JSON.stringify({message: "No board has been created yet!", status: 401}))

        return new Response(JSON.stringify(boards), {status:200});

    } catch (error) {
        return new Response("Internal Server Error",{status: 500});
    }
}