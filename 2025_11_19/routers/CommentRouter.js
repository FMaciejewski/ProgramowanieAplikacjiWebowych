import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/post', async (req, res) => {
    const kom = await prisma.komentarz.create({
        data: {
            tekst: req.body.tekst,
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
            tekst: req.body.tekst,
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

export default router
