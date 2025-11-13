const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const object = {
    Imie: "Antek",
    Wiek: 67
}

const html = "<!DOCTYPE html>\n" +
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

app.get('/', (req, res) => {
    res.status(200).send("Hello World!");
})

app.get('/2', (req, res) => {
    res.status(200).json(object);
})

app.get('/3', (req, res) => {
    res.status(200).send(html);
})

app.get('/4', (req, res) => {
    res.status(200).sendFile(__dirname  + '/assets/stronka.html');
})

app.get('/get_params', (req, res) => {
    const data = req.query;
    const timestamp = Date.now();
    console.log(JSON.stringify(data, null, 2));
    fs.writeFileSync('assets/params_' + timestamp + '.json', JSON.stringify(data, null, 3), 'utf8');
    res.status(200).json({ok: "ok"});
})

app.use(express.static(path.join(__dirname, '/assets')), (req, res) => {
    res.status(404).json({Not_Found: req.url});
});

app.listen(3000);