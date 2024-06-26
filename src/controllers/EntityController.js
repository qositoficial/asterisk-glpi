import axios from "axios";
import dotenv from "dotenv";
import { Entity } from "../models/EntityModel.js";

import { envPath } from "../utils/dotenv.js";

dotenv.config({ path: envPath });

const { GLPI_API_URL, GLPI_API_TIMEOUT, GLPI_APP_TOKEN } = process.env;

export async function searchEntity(glpiSessionToken, entityName) {
    try {
        const response = await axios.get(`${GLPI_API_URL}/search/Entity`, {
            timeout: GLPI_API_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
                "App-Token": GLPI_APP_TOKEN,
                "Session-Token": glpiSessionToken,
            },
            params: {
                // nome da entidade - 14
                "criteria[0][field]": "14",
                "criteria[0][searchtype]": "contains",
                "criteria[0][value]": entityName,
                // entityFullName - 1
                "forcedisplay[0]": "1",
                // entityID - 2
                "forcedisplay[1]": "2",
                // entityName - 14
                "forcedisplay[2]": "14",
                // entityCNPJ - 70
                "forcedisplay[3]": "70",
            },
        });

        if (response.data && response.data.data) {
            return response.data.data.map(
                (entity) =>
                    new Entity(
                        entity["2"],
                        entity["70"],
                        entity["14"],
                        entity["1"]
                    )
            );
        }

        return [];
    } catch (error) {
        console.error(
            "Error searching entity in GLPI:",
            error.response?.data || error.message
        );
        return [];
    }
}
