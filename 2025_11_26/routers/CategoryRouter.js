import express from 'express'
import { PrismaClient } from '@prisma/client'
import {asyncHandler} from '../middlewares/asyncHandler.js'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/post', asyncHandler(async(req, res) => {
    const cat = await prisma.kategoria.create({
        data: { nazwa: req.body.nazwa }
    })
    res.status(200).json(cat)
}))

router.get('/get', asyncHandler(async (req, res) => {
    const cats = await prisma.kategoria.findMany({
        include: { wpisy: true }
    })
    res.status(200).json(cats)
}))

router.get('/get/:id', asyncHandler(async (req, res) => {
    const cat = await prisma.kategoria.findUnique({
        where: { ID: Number(req.params.id) },
        include: { wpisy: true }
    })
    res.status(200).json(cat)
}))

router.put('/put/:id', asyncHandler(async (req, res) => {
    const cat = await prisma.kategoria.update({
        where: { ID: Number(req.params.id) },
        data: { nazwa: req.body.nazwa }
    })
    res.status(200).json(cat)
}))

router.delete('/delete/:id', asyncHandler(async (req, res) => {
    await prisma.kategoria.delete({
        where: { ID: Number(req.params.id) }
    })
    res.status(200).json({ ok: true })
}))

export default router
