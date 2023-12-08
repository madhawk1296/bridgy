import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXT_AUTH_SECRET,
  providers: []
};