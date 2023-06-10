import User from "@/models/User";
import { connectToDB } from "@/config/MongoDb";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    try {
        await connectToDB();
        const {fullName, email, password} = await request.json();
    
        const hashedPassword = await bcrypt.hash(password,10);

        // check whether user exists
        const userExist = await User.findOne({email}) 
        if(userExist){
            return new Response("user already exist, please Login!",{status: 400})
        }

        const user = await new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })

        await user.save();

        return new Response(JSON.stringify(user), {status: 200})

    } catch (error) {
        return new Response("Internal Server Error",{status:500})
    }
}
