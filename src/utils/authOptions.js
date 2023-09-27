import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './connect';
import GithubProvider from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

//Callback URL:
// http://localhost:3000/api/auth/callback/google
// http://localhost:3000/api/auth/callback/github

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
