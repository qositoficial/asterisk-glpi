import http from "http";
import { setCalleridName } from "./views/CalleridName.js";

const server = http.createServer(async (req, res) => {
    const urlParts = req.url.split("/");
    const userPhone = urlParts[urlParts.length - 1];

    try {
        const result = await setCalleridName(userPhone);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`SET VARIABLE CALLERID(name) "${result}"\n`);
    } catch (error) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`SET VARIABLE CALLERID(name) "${userPhone}"\n`);
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
