import User from "@/models/User";
import { connectToDB } from "@/config/MongoDb";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    try {
        await connectToDB();
        const {email, password} = request.body;
        
        const user = await User.findOne({email});

        if(user && await bcrypt.compare(password,user.password)){
            return new Response(JSON.stringify(user),{status: 202})
        }

        // check whether user exists

    } catch (error) {
        return new Response("Internal Server Error",{status:500})
    }
}
