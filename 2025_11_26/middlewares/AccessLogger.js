import {db} from '../index.js';

export const accessLogger = (req, res, next) => {
    const start = Date.now()
    res.on('finish', ()=>{
        const logData = {
            timestamp: new Date(),
            method: req.method.toUpperCase(),
            url: req.url,
            statusCode: res.statusCode,
            responseTime: 0
        }

        logData.responseTime = Date.now() - start
        if(db){
            db.collection("accessLogs").insertOne(logData)
        }
    })
    next()
}