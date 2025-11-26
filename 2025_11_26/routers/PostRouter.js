import express from 'express'
import { PrismaClient } from '@prisma/client'
import {asyncHandler} from "../middlewares/asyncHandler.js"

const prisma = new PrismaClient()
const router = express.Router()

router.post('/post', asyncHandler(async (req, res) => {
    const wpis = await prisma.wpis.create({
        data: {
            tekst: req.body.tekst,
            kategoriaID: req.body.kategoriaID
        }
    })
    res.status(200).json(wpis)
}))

router.get('/get', asyncHandler(async (req, res) => {
    const wpisy = await prisma.wpis.findMany({
        include: { kategoria: true, komentarze: true }
    })
    res.status(200).json(wpisy)
}))

router.get('/get/:id', asyncHandler(async (req, res) => {
    const wpis = await prisma.wpis.findUnique({
        where: { ID: Number(req.params.id) },
        include: { kategoria: true, komentarze: true }
    })
    res.status(200).json(wpis)
}))

router.put('/put/:id', asyncHandler(async (req, res) => {
    const updated = await prisma.wpis.update({
        where: { ID: Number(req.params.id) },
        data: {
            tekst: req.body.tekst,
            kategoriaID: req.body.kategoriaID
        }
    })
    res.status(200).json(updated)
}))

router.delete('/delete/:id', asyncHandler(async (req, res) => {
    await prisma.wpis.delete({
        where: { ID: Number(req.params.id) }
    })
    res.status(200).json({ ok: true })
}))

export default router
