import NextAuth from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/src/utils/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const getAuthSession = () => getServerSession(authOptions);
