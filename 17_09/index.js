import http from "http";
import {readFile, writeFile} from "fs/promises";
import {URL} from "url";
import * as url from "node:url";

const port = 3000;
const hostname = "localhost";

const server = http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url, "http://localhost:" + port);
    const pathname = parsedUrl.pathname;
    switch (pathname) {
        case "/":
            res.statusCode = 200;
            const html = await readFile("html/index.html");
            res.setHeader("Content-Type", "text/html");
            res.write(html);
            res.end();
            break;
        case "/kontakt":
            const name = parsedUrl.searchParams.get("name");
            const email = parsedUrl.searchParams.get("email");
            const message = parsedUrl.searchParams.get("message");

            const timestamp = Date.now();

            if(name && email && message) {
                await writeFile(`messages/message_${timestamp}.json`, JSON.stringify({name, email, message}));
                console.log(`Zapisano wiadomość: message_${timestamp}.json`);
            }



            res.statusCode = 200;
            const kontakt = await readFile("html/contact.html");
            res.setHeader("Content-Type", "text/html");
            res.write(kontakt);
            res.end();
            break;
        case "/css/style.css":
            res.statusCode = 200;
            const css = await readFile("styles/style.css");
            res.setHeader("Content-Type", "text/css");
            res.write(css);
            res.end();
            break;
    }
})

server.listen(port, hostname, () => {
    console.log("Server listening on port " + port);
})