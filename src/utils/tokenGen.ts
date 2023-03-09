import jwt from 'jsonwebtoken';


export default function tokenGenerator(email : string) {
    const payload = {
        email: email
    }
    return jwt.sign(payload, process.env.SECRET_KEY || "tokenExample123", {
        expiresIn: "1h"
    })
}

