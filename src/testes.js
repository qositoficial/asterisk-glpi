import { searchFullUser } from "./controllers/FullUserController.js";
import { createTicket } from "./controllers/TicketController.js";

async function main() {
    const user = await searchFullUser("41997035511");
    console.log(`Usuário: ${JSON.stringify(user)}`);

    const newTicket = await createTicket(user, "1719230035.357");
    console.log(`Ticket: ${JSON.stringify(newTicket)}`);
}

main();
