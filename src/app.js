#!/usr/bin/env node

import { createTicket } from "./controllers/TicketController.js";
import { searchFullUser } from "./controllers/FullUserController.js";
import { setCalleridName } from "./views/CalleridName.js";
import { sendText } from "./controllers/EvolutionApiContoller.js";

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
} else if (args[0] == "sendText") {
    if (args.length !== 6) {
        console.error(
            "Usage: node app.js <request> <queueName> <src> <date> <hour> <asteriskUniqueID>"
        );
        process.exit(1);
    }

    const text = `*[Q-Phone]* \n☎️ Chamada entrando na fila: ${args[1]} \n\nOrigem: ${args[2]} \nData: ${args[3]} \nHorário: ${args[4]}`;

    console.log(await sendText(text, args[5]));
} else {
    console.error("Usage: node app.js <request> <parameters>");
    process.exit(1);
}
