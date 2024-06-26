import axios from "axios";
import dotenv from "dotenv";

import { login, logoff } from "./SessionController.js";

dotenv.config();

const {
    GLPI_API_URL,
    GLPI_API_TIMEOUT,
    GLPI_APP_TOKEN,
    GLPI_DEFAULT_TICKET_SUBJECT,
    GLPI_TICKET_REQUEST_ORIGIN,
    QPHONE_URL_RECORD,
} = process.env;

export async function createTicket(glpiFullUser, asteriskUniqueID) {
    try {
        const glpiSessionToken = await login();

        const response = await axios.post(
            `${GLPI_API_URL}/Ticket`,
            {
                input: {
                    name: GLPI_DEFAULT_TICKET_SUBJECT,
                    content: `<p>Ticket: ${GLPI_DEFAULT_TICKET_SUBJECT}</p>
                      <p>Gravação da chamada:</p>
                      <p><audio src='${QPHONE_URL_RECORD}${asteriskUniqueID}' controls buffered>
                      To listen to the audio, it must be present on the Q-Phone server.</audio></p>`,
                    _users_id_requester: glpiFullUser.id,
                    requesttypes_id: GLPI_TICKET_REQUEST_ORIGIN,
                    entities_id: glpiFullUser.entity.id,
                    type: "2",
                },
            },
            {
                timeout: GLPI_API_TIMEOUT,
                headers: {
                    "Content-Type": "application/json",
                    "App-Token": GLPI_APP_TOKEN,
                    "Session-Token": glpiSessionToken,
                },
            }
        );

        const ticketNumber = response.data.id;

        await logoff(glpiSessionToken);

        return ticketNumber;
    } catch (error) {
        throw new Error(
            `Error creating ticket: ${error.response?.data || error.message}`
        );
    }
}
