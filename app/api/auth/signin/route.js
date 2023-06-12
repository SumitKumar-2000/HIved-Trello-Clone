import User from "@/models/User";
import { connectToDB } from "@/config/MongoDb";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    try {
        await connectToDB();
        const {email, password} = await request.json();
        
        const user = await User.findOne({email});

        if(user && await bcrypt.compare(password,user.password)){
            return new Response(JSON.stringify(user),{status: 202})
        }

        if(!user){
            return new Response("Incorrect password or email!",{status:401});
        }

    } catch (error) {
        return new Response("Internal Server Error",{status:500})
    }
}
