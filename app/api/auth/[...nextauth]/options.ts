import { config } from "../../../lib/config";
import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

process.env.NEXTAUTH_URL = config.nextauth.url;

const token = config.discord.token;
const clientId = atob(token.split(".")[0]);

if (!clientId || !config.discord.client_secret) {
	console.error("Discord OAuth credentials are missing in config.yml.");
}

async function refreshDiscordToken(token: any) {
	try {
		const params = new URLSearchParams({
			client_id: clientId,
			client_secret: config.discord.client_secret,
			grant_type: "refresh_token",
			refresh_token: token.refresh_token,
		});

		const response = await fetch("https://discord.com/api/oauth2/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: params.toString(),
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			access_token: refreshedTokens.access_token,
			expires_at: Date.now() + refreshedTokens.expires_in * 1000,
			refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
		};
	} catch (error) {
		console.error("Error refreshing discord access token:", error);
		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export const authOptions: NextAuthOptions = {
	providers:[
		DiscordProvider({
			clientId: clientId,
			clientSecret: config.discord.client_secret,
			authorization: {
				params: {
					scope: "identify",
				},
			},
		}),
	],

	secret: config.nextauth.secret,

	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.access_token = account.access_token;
				token.user_id = account.providerAccountId;
				token.refresh_token = account.refresh_token;
				token.expires_at = (account.expires_at as number) * 1000;
				return token;
			}

			if (token.expires_at && Date.now() < (token.expires_at as number)) {
				return token;
			}

			return refreshDiscordToken(token);
		},
		async session({ session, token }) {
			if (session && token) {
				(session as any).access_token = token.access_token;
				(session as any).user_id = token.user_id;
				(session as any).error = token.error;
			}
			return session;
		},
	},
};