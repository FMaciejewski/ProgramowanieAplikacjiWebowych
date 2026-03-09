import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/post', async (req, res) => {
    const kom = await prisma.komentarz.create({
        data: {
            uzytkownik: req.body.uzytkownik,
            tytul: req.body.tytul,
            opis: req.body.opis,
            wpisID: req.body.wpisID
        }
    })
    res.status(200).json(kom)
})

router.get('/get', async (req, res) => {
    const kom = await prisma.komentarz.findMany({
        include: { wpis: true }
    })
    res.status(200).json(kom)
})

router.get('/get/:id', async (req, res) => {
    const kom = await prisma.komentarz.findUnique({
        where: { ID: Number(req.params.id) },
        include: { wpis: true }
    })
    res.status(200).json(kom)
})

router.put('/put/:id', async (req, res) => {
    const kom = await prisma.komentarz.update({
        where: { ID: Number(req.params.id) },
        data: {
            uzytkownik: req.body.uzytkownik,
            tytul: req.body.tytul,
            opis: req.body.opis,
            wpisID: req.body.wpisID
        }
    })
    res.status(200).json(kom)
})

router.delete('/delete/:id', async (req, res) => {
    await prisma.komentarz.delete({
        where: { ID: Number(req.params.id) }
    })
    res.status(200).json({ ok: true })
})

router.get('/get/wpis/:id', async (req, res) => {
    const kom = await prisma.komentarz.findMany({
        where: { wpisID: Number(req.params.id) },
        include: { wpis: true }
    })
    res.status(200).json(kom)
})

export default router
