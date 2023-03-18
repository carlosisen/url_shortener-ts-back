import jwt from 'jsonwebtoken';


export default function tokenGenerator(_id : any) {
    const payload : object = {idUser: _id.toString()}
    return jwt.sign(payload, process.env.SECRET_KEY || "tokenExample123", {
        expiresIn: "1h"
    })
}

