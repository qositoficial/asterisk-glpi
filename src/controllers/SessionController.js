import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { GLPI_API_URL, GLPI_API_TIMEOUT, GLPI_APP_TOKEN, GLPI_USER_TOKEN } =
    process.env;

export async function login() {
    try {
        const response = await axios.get(`${GLPI_API_URL}/initSession`, {
            timeout: GLPI_API_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
                "App-Token": GLPI_APP_TOKEN,
                Authorization: `user_token ${GLPI_USER_TOKEN}`,
            },
        });

        if (response.data && response.data.session_token) {
            const glpiSessionToken = response.data.session_token;
            return glpiSessionToken;
        }

        return null;
    } catch (error) {
        console.error(
            "Error logging in to GLPI:",
            error.response?.data || error.message
        );
        return null;
    }
}

export async function logoff(glpiSessionToken) {
    try {
        const response = await axios.get(`${GLPI_API_URL}/killSession`, {
            timeout: GLPI_API_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
                "App-Token": GLPI_APP_TOKEN,
                "Session-Token": glpiSessionToken,
            },
        });

        if (response.data) {
            return true;
        }

        return false;
    } catch (error) {
        console.error(
            "Error killing session in GLPI:",
            error.response?.data || error.message
        );
        return false;
    }
}
