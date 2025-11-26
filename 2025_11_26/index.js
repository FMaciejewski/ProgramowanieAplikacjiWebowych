import express from 'express'
import {PrismaClient} from '@prisma/client'
import CategoryRouter from './routers/CategoryRouter.js'
import PostRouter from './routers/PostRouter.js'
import CommentRouter from './routers/CommentRouter.js'
import {MongoClient} from 'mongodb'
import {env} from "prisma/config";
import {accessLogger} from "./middlewares/AccessLogger.js";
import {errorLogger} from "./middlewares/ErrorLogger.js"

const app = express()
const client = new PrismaClient()

const mongo = new MongoClient(env("MONGO_URL"))

export let db;

try{
    await mongo.connect()
    console.log('MongoDB Connected')
    db = mongo.db("logsdb")
}
catch(error){
    console.log(error)
}

app.use(express.json())
app.use(accessLogger)

app.use('/posts', PostRouter)
app.use('/categories', CategoryRouter)
app.use('/comments', CommentRouter)

app.use(errorLogger)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
