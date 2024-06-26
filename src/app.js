#!/usr/bin/env node

import { setCalleridName } from "./views/CalleridName.js";

const args = process.argv.slice(2);

if (args[0] == "calleridName") {
    if (args.length !== 2) {
        console.error("Usage: node app.js <request> <userPhone>");
        process.exit(1);
    }

    const result = await setCalleridName(args[1]);

    console.log(`SET VARIABLE "CALLERID(name)" "${result}"`);
} else {
    console.error("Usage: node app.js <request> <parameters>");
    process.exit(1);
}
