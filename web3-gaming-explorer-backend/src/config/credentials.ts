import dotEnv from "dotenv";

dotEnv.config();

export const cmcApiKey: string | undefined = process.env.CMCKEY;
