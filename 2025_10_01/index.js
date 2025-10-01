const http = require('http');
const fs = require('fs');
const url = require('url');


const output = fs.readFileSync('stronka.html').toString();

let html = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title>HTML przykład</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "    <h1>Nagłówek</h1>\n" +
    "    <p>Napis</p>\n" +
    "</body>\n" +
    "</html>";

const server = http.createServer(function (req, res) {
    switch (req.url.split('?')[0]) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Strona glowna');
            break;
        case '/2':
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({Imie : "Jan", Wiek: 67}, null, 3))
            break;
        case '/3':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
            break;
        case '/4':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(output);
            break;
        case '/get_params':
            let adr = url.parse(req.url, true);
            let timestamp = Date.now();
            console.log(adr.query);
            fs.writeFileSync('params_' + timestamp + '.json', JSON.stringify(adr.query, null, 3), 'utf8');
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ok: "ok"}, null, 3));
    }
})

server.listen(3000, 'localhost');