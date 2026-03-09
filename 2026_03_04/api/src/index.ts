import express from 'express'
import CategoryRouter from './routers/CategoryRouter'
import PostRouter from './routers/PostRouter'
import CommentRouter from './routers/CommentRouter'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use('/posts', PostRouter)
app.use('/categories', CategoryRouter)
app.use('/comments', CommentRouter)

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
