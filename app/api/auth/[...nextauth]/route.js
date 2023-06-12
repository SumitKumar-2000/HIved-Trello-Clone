import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import { connectToDB } from '@/config/MongoDb';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDB();
        const {email, password} = credentials;

        const user = await User.findOne({email});

        if(user && await bcrypt.compare(password,user.password)){
            return new Response(JSON.stringify(user),{status: 202})
        }
        

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin"
  },
  secret: process.env.NEXTAUTH_SECRET
});


export { handler as GET, handler as POST };