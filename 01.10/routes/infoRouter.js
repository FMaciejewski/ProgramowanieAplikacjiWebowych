import express from 'express';
import * as path from "node:path";

const InfoRouter = express.Router();
const __dirname = import.meta.dirname;

InfoRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/about.html'));
});

export default InfoRouter;