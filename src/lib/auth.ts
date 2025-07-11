import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: ({ session, user }: { session: any; user: any }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
    async signIn({ user }: any) {
      // Only allow admin users to sign in
      const allowedEmails = process.env.ADMIN_EMAILS?.split(',') || [];
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  session: {
    strategy: 'database' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions); 