import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';

const validateToken = (req : Request, res: Response, next :NextFunction ) => {

    const token  = req.query.token ;

    if (!token) {
        return res.status(403).json({
            error: 'Access denied'
        })
    }
    try {
        if(typeof(token)=== "string"){
        const userVerified = jwt.verify(token, process.env.SECRET_KEY || "tokenExample123") as object;
        req.body= {...req.body, ...userVerified}
        console.log(userVerified, req.body)
        return next()}

    } catch (error) {
        res.status(403).json({ error: 'invalid token' })
    }
}
export default validateToken