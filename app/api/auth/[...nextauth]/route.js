import NextAuth from "next-auth/next";

import { connectToDB } from "@/config/MongoDb";
import User from "@models/user";

const handler = NextAuth({  

    providers: [
        
    ],

    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({email : session.user.email})
            session.user.id = sessionUser._id.toString();
            return session;
        }, 
    
        async signIn({profile}){
    
            try {
                await connectToDB();
    
                // check user already exist or not
                const userExist = await User.findOne({email: profile.email})
        
                // create new user
                if(!userExist){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image: profile.picture
                    })
                }
                
                return true;
            } catch (error) {
                console.log("User signIn error: ",error);
            }
        }   
    },
})


export { handler as GET, handler as POST };