import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/post', async (req, res) => {
    const cat = await prisma.kategoria.create({
        data: { nazwa: req.body.nazwa }
    })
    res.status(200).json(cat)
})

router.get('/get', async (req, res) => {
    const cats = await prisma.kategoria.findMany({
        include: { wpisy: true }
    })
    res.status(200).json(cats)
})

router.get('/get/:id', async (req, res) => {
    const cat = await prisma.kategoria.findUnique({
        where: { ID: Number(req.params.id) },
        include: { wpisy: true }
    })
    res.status(200).json(cat)
})

router.put('/put/:id', async (req, res) => {
    const cat = await prisma.kategoria.update({
        where: { ID: Number(req.params.id) },
        data: { nazwa: req.body.nazwa }
    })
    res.status(200).json(cat)
})

router.delete('/delete/:id', async (req, res) => {
    await prisma.kategoria.delete({
        where: { ID: Number(req.params.id) }
    })
    res.status(200).json({ ok: true })
})

export default router
