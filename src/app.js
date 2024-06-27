#!/usr/bin/env node

import { createTicket } from "./controllers/TicketController.js";
import { searchFullUser } from "./controllers/FullUserController.js";
import { setCalleridName } from "./views/CalleridName.js";

const args = process.argv.slice(2);

if (args[0] == "calleridName") {
    if (args.length !== 2) {
        console.error("Usage: node app.js calleridName <userPhone>");
        process.exit(1);
    }

    const result = await setCalleridName(args[1]);

    console.log(`SET VARIABLE "CALLERID(name)" "${result}"`);
} else if (args[0] == "createTicket") {
    if (args.length !== 3) {
        console.error(
            "Usage: node app.js createTicket <userPhone> <asteriskUniqueID>"
        );
        process.exit(1);
    }

    const glpiFullUser = await searchFullUser(args[1]);

    const ticket = await createTicket(glpiFullUser, args[1], args[2]);

    console.log(`SET VARIABLE "GLPI_TICKET_NUMBER" "${ticket}"`);
} else {
    console.error("Usage: node app.js <request> <parameters>");
    process.exit(1);
}
