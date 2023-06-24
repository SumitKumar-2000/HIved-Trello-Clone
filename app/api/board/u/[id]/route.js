import { connectToDB } from "@/config/MongoDb";
import Board from "@/models/Board";

export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const boards = await Board.find({creator: params.id}).populate("creator");

        return new Response(JSON.stringify(boards), {status:200});  

    } catch (error) {
        console.log("error: ",error);
        return new Response("Internal Server Error",{status: 500});
    }
}

