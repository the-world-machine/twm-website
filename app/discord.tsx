"use server";

import axios from "axios";
import { Session } from "next-auth";
import { Fetch } from "./database";
import { UserData } from "./components/database-parse-type";

export async function DiscordLogIn(
	discordData: Session,
): Promise<UserData | null> {
	if (!discordData?.access_token || (discordData as any).error === "RefreshAccessTokenError") {
		return null;
	}

	try {
		const response = await axios.get("https://discord.com/api/users/@me", {
			headers: { Authorization: `Bearer ${discordData.access_token}` },
		});

		if (response.status != 200) {
			return null;
		}

		const id = response.data.id;

		const userData = await Fetch(id);

		if (userData == null) {
			return null;
		}

		return userData;
	} catch (error: any) {
		if (error.response?.status === 401) {
			return null;
		}
		throw error;
	}
}