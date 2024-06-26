import axios from "axios";
import dotenv from "dotenv";
import { User } from "../models/UserModel.js";

dotenv.config();

const { GLPI_API_URL, GLPI_API_TIMEOUT, GLPI_APP_TOKEN } = process.env;

export async function searchUser(sessionToken, userPhone) {
    try {
        const response = await axios.get(`${GLPI_API_URL}/search/User`, {
            timeout: GLPI_API_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
                "App-Token": GLPI_APP_TOKEN,
                "Session-Token": sessionToken,
            },
            params: {
                // telefone - 6
                "criteria[0][link]": "OR",
                "criteria[0][field]": "6",
                "criteria[0][searchtype]": "contains",
                "criteria[0][value]": userPhone,
                // celular - 11
                "criteria[1][link]": "OR",
                "criteria[1][field]": "11",
                "criteria[1][searchtype]": "contains",
                "criteria[1][value]": userPhone,
                // username - 1
                "forcedisplay[0]": "1",
                // userID - 2
                "forcedisplay[1]": "2",
                // email - 5
                "forcedisplay[2]": "5",
                // telefone - 6
                "forcedisplay[3]": "6",
                // primeiro nome - 9
                "forcedisplay[4]": "9",
                // último nome - 34
                "forcedisplay[5]": "34",
                // celular - 11
                "forcedisplay[6]": "11",
                // entidade padrão - 77
                "forcedisplay[7]": "77",
            },
        });

        if (response.data && response.data.data) {
            return response.data.data.map(
                (user) =>
                    new User(
                        user["2"],
                        user["1"],
                        user["9"],
                        user["34"],
                        user["5"],
                        user["11"],
                        user["6"],
                        user["77"]
                    )
            );
        }

        return [];
    } catch (error) {
        console.error(
            "Error searching user in GLPI:",
            error.response?.data || error.message
        );
        return [];
    }
}
