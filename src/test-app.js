#!/usr/bin/env node

import { searchFullUser } from "./controllers/FullUserController.js";
import { createTicket } from "./controllers/TicketController.js";

const args = process.argv.slice(2);

if (args[0] == "calleridName") {
    if (args.length !== 2) {
        console.error("Usage: node app.js <request> <userPhone>");
        process.exit(1);
    }

    const glpiFullUser = await await searchFullUser(args[1]);

    console.log(`SET VARIABLE "GLPI_USER" "${JSON.stringify(glpiFullUser)}"`);
    console.log(
        `SET VARIABLE "CALLERID(name)" "${glpiFullUser.firstName} ${glpiFullUser.lastName} "`
    );
} else {
    console.error("Usage: node app.js <request> <parameters>");
    process.exit(1);
}

// async function main() {
//     const user = await searchFullUser("41997035511");
//     console.log(`Usuário: ${JSON.stringify(user)}`);

//     const newTicket = await createTicket(user, "1719230035.357");
//     console.log(`Ticket: ${JSON.stringify(newTicket)}`);
// }

// main();
