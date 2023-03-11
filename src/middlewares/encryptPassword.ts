import { Request, Response, NextFunction } from "express"
import CryptoJS, { enc } from "crypto-js"

const encryptPassword= (req: Request, res: Response, next : NextFunction) => {
        if (!req.body.password || typeof(req.body.password) !== "string"){
            return res.status(400).json({msg: "there is a error in your password"})
        }
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_CRYPTO as string ).toString()
    return next()
}

export default encryptPassword