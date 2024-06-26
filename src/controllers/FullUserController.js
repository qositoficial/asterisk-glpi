import dotenv from "dotenv";

import { Entity } from "../models/EntityModel.js";
import { User } from "../models/UserModel.js";

import { formattedPhone } from "../utils/FormattedPhone.js";

import { searchUser } from "./UserController.js";
import { login, logoff } from "./SessionController.js";
import { searchEntity } from "./EntityController.js";

import { envPath } from "../utils/dotenv.js";

dotenv.config({ path: envPath });

const {
    GLPI_DEFAULT_USERID,
    GLPI_DEFAULT_USERNAME,
    GLPI_DEFAULT_FIRSTNAME,
    GLPI_DEFAULT_ENTITYNAME,
} = process.env;

export async function searchFullUser(userPhone) {
    try {
        const glpiSessionToken = await login();

        const phoneNumber = formattedPhone(userPhone);

        const glpiUser = await searchUser(glpiSessionToken, phoneNumber);

        if (glpiUser.length === 0) {
            await logoff(glpiSessionToken);

            return new User(
                GLPI_DEFAULT_USERID,
                GLPI_DEFAULT_USERNAME,
                GLPI_DEFAULT_FIRSTNAME,
                null,
                null,
                null,
                null,
                new Entity(null, GLPI_DEFAULT_ENTITYNAME, null, null)
            );
        }

        const glpiEntity = await searchEntity(
            glpiSessionToken,
            glpiUser[0].entity
        );

        if (glpiEntity.length === 0) {
            glpiUser[0].entity = new Entity(
                null,
                GLPI_DEFAULT_ENTITYNAME,
                null,
                null
            );

            await logoff(glpiSessionToken);

            return glpiUser;
        }

        glpiUser[0].entity = new Entity(
            glpiEntity[0].id,
            glpiEntity[0].cnpj,
            glpiEntity[0].name,
            glpiEntity[0].fullName
        );

        await logoff(glpiSessionToken);

        return glpiUser[0];
    } catch (error) {
        throw new Error(
            "Error searching user or entity in GLPI: ",
            error.response?.data || error.message
        );
    }
}
