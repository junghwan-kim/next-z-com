import NextAuth from "next-auth"
 import CredentialsProvider from "next-auth/providers/credentials";
 import {NextResponse} from "next/server";
 
 export const {
   handlers: { GET, POST },
   auth,
   signIn,
 } = NextAuth({
   pages: {
     signIn: '/i/flow/login',
     newUser: '/i/flow/signup',
   },
   /*callbacks: {
    async session({ session, token }) {
      console.log('session callback', session, token);
      const authResponse = await fetch(내정보를 가져오는 서버 API);
      const userData = await authResponse.json();
      (session as any).userData = userData;
      return session;
    }
  },*/
   providers: [
     CredentialsProvider({
       async authorize(credentials) {
         const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             id: credentials.username,
             password: credentials.password,
           }),
         })
 
         if (!authResponse.ok) {
           return null
         }
 
         const user = await authResponse.json()
         console.log('user', user);
         return {
           email: user.id,
           name: user.nickname,
           image: user.image,
           ...user,
         }
       },
     }),
   ]
 });