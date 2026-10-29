import express from 'express';
import ksiazki from '../data/books.json' with {type: 'json'};
import * as fs from "node:fs";
import * as path from "node:path";

const __dirname = import.meta.dirname;
const BookRouter = express.Router();
const plik = path.join(__dirname, '../data/books.json');

BookRouter.get('/books', (req, res) => {
    res.json(ksiazki);
});

BookRouter.get('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    let wynik = ksiazki;

    wynik = wynik.filter(p => p.id === id);

    res.json(wynik);
});

BookRouter.get('/add' , (req, res) => {
    res.sendFile(path.join(__dirname, '../views/add.html'));
});

BookRouter.post('/books', (req, res) => {
    const { title, author, year } = req.body;

    ksiazki.push({
        id: ksiazki.length + 1,
        title,
        author,
        year: Number(year)
    })
    fs.writeFileSync(plik, JSON.stringify(ksiazki, null, 2));

    res.redirect('/add');
});

export default BookRouter;