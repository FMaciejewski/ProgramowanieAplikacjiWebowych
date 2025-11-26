import express from 'express'
import { PrismaClient } from '@prisma/client'
import {asyncHandler} from "../middlewares/asyncHandler.js";

const prisma = new PrismaClient()
const router = express.Router()

router.post('/post', asyncHandler(async (req, res) => {
    const kom = await prisma.komentarz.create({
        data: {
            tekst: req.body.tekst,
            wpisID: req.body.wpisID
        }
    })
    res.status(200).json(kom)
}))

router.get('/get', asyncHandler(async (req, res) => {
    const kom = await prisma.komentarz.findMany({
        include: { wpis: true }
    })
    res.status(200).json(kom)
}))

router.get('/get/:id', asyncHandler(async (req, res) => {
    const kom = await prisma.komentarz.findUnique({
        where: { ID: Number(req.params.id) },
        include: { wpis: true }
    })
    res.status(200).json(kom)
}))

router.put('/put/:id', asyncHandler(async (req, res) => {
    const kom = await prisma.komentarz.update({
        where: { ID: Number(req.params.id) },
        data: {
            tekst: req.body.tekst,
            wpisID: req.body.wpisID
        }
    })
    res.status(200).json(kom)
}))

router.delete('/delete/:id', asyncHandler(async (req, res) => {
    await prisma.komentarz.delete({
        where: { ID: Number(req.params.id) }
    })
    res.status(200).json({ ok: true })
}))

export default router
