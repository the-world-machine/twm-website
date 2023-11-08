import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import Config from "../../../../twm-config.json"

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
        clientId: Config.DISCORD_ID,
        clientSecret: Config.DISCORD_SECRET,
        authorization: {
          params: {
            scope: 'identify',
          },
        }
    }),
  ],

  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token });
      }
      return token
    },
    async session({session, token}) {
    if(session) {
      session = Object.assign({}, session, {access_token: token.access_token})
      }
    return session
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };