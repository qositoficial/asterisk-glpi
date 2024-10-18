import dotenv from "dotenv";

import { searchFullUser } from "../controllers/FullUserController.js";

dotenv.config();

const { GLPI_DEFAULT_USERID } = process.env;

export async function setCalleridName(userPhone) {
    const fullUser = await searchFullUser(userPhone);

    if (!fullUser || fullUser.id === GLPI_DEFAULT_USERID) {
        return userPhone;
    }

    return `${fullUser.firstName} ${fullUser.lastName}`;
}
