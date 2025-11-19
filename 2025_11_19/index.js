import express from 'express'
import {PrismaClient} from '@prisma/client'
import CategoryRouter from './routers/CategoryRouter.js'
import PostRouter from './routers/PostRouter.js'
import CommentRouter from './routers/CommentRouter.js'

const app = express()
const client = new PrismaClient()

app.use(express.json())

app.use('/posts', PostRouter)
app.use('/categories', CategoryRouter)
app.use('/comments', CommentRouter)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
