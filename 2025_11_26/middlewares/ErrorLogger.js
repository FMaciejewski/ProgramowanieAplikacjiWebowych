import {db} from "../index.js";

export const errorLogger = (error, req, res, next) => {
    const statusCode = error.status || error.statusCode || 404

    res.status(statusCode)

    const errorLog = {
        timestamp: new Date(),
        method: req.method?.toUpperCase(),
        url: req.url,
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
        statusCode: statusCode
    }

    if(db){
        db.collection("errorLogs").insertOne(errorLog)
    }

    res.json(error)
}