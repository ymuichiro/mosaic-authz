import NextAuth, { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.OAUTH_DISCORD_CLIENT_ID as string,
      clientSecret: process.env.OAUTH_DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: { scope: 'identify' },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signOut',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      (session as any).accessToken = token.accessToken;
      if (session.user) {
        (session as any).user.id = token.id;
      }
      return session;
    },
    jwt: async ({ token, account, profile }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.id = (profile as any).id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
