import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from '../../../../prisma.js'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (user && user.password === credentials.password) {
          return user; // ✅ return user if valid
        }
        return null; // invalid
      }
    })
  ],
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
