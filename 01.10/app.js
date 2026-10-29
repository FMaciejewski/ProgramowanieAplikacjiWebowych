import express from "express"
import * as path from "node:path";
import BookRouter from "./routes/booksRouter.js";
import InfoRouter from "./routes/infoRouter.js";


const app = express();
const port = 4000;
const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
});

app.use('/about', InfoRouter);
app.use('/', BookRouter);

app.listen(port, () => {
    console.log("Serwer biblioteki działa na porcie " + port);
});