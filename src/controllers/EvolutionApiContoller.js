import axios from "axios";
import dotenv from "dotenv";

import { envPath } from "../utils/dotenv.js";

dotenv.config({ path: envPath });

const {
    EVOLUTION_API_URL,
    EVOLUTION_API_INSTANCE_NAME,
    EVOLUTION_API_TIMEOUT,
    EVOLUTION_API_KEY,
    EVOLUTION_API_DST,
    QPHONE_URL_RECORD,
} = process.env;

export async function sendText(text, asteriskUniqueID) {
    try {
        const response = await axios.post(
            `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_API_INSTANCE_NAME}`,
            {
                number: EVOLUTION_API_DST,
                options: {
                    delay: 1200,
                    presence: "composing",
                    linkPreview: true,
                },
                textMessage: {
                    text: `${text} \n\n${QPHONE_URL_RECORD}${asteriskUniqueID}`,
                },
            },
            {
                timeout: EVOLUTION_API_TIMEOUT,
                headers: {
                    "Content-Type": "application/json",
                    apikey: EVOLUTION_API_KEY,
                },
            }
        );

        if (response.data) {
            return JSON.stringify(response.data);
        }

        return null;
    } catch (error) {
        console.error(
            "Error sending text in EvolutionApi:",
            error.response?.data || error.message
        );
        return null;
    }
}
