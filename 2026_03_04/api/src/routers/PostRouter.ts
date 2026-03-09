import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/post', async (req, res) => {
    const wpis = await prisma.wpis.create({
        data: {
            tytul: req.body.tytul,
            opis: req.body.opis,
            kategoriaID: req.body.kategoriaID
        }
    })
    res.status(200).json(wpis)
})

router.get('/get', async (req, res) => {
    const wpisy = await prisma.wpis.findMany({
        include: { kategoria: false, komentarz: false }
    })
    res.status(200).json(wpisy)
})

router.get('/get/:id', async (req, res) => {
    const wpis = await prisma.wpis.findUnique({
        where: { ID: Number(req.params.id) },
        include: { kategoria: false, komentarz: false }
    })
    res.status(200).json(wpis)
})

router.put('/put/:id', async (req, res) => {
    const updated = await prisma.wpis.update({
        where: { ID: Number(req.params.id) },
        data: {
            tytul: req.body.tytul,
            opis: req.body.opis,
            kategoriaID: req.body.kategoriaID
        }
    })
    res.status(200).json(updated)
})

router.delete('/delete/:id', async (req, res) => {
    await prisma.wpis.delete({
        where: { ID: Number(req.params.id) }
    })
    res.status(200).json({ ok: true })
})

export default router
