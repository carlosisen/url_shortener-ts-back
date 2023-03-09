import { Request, Response } from "express"
import { userModel } from "../models/mongoModel"
import { IUser } from "../types"

const insertUser = async (req: Request, res: Response) => {
    if (!req.body) {
        console.log(req.body)
        return res.status(400).json({ message: "No se ha enviado ningun dato" })
    }
    // ya tendria que haber pasa por un validator, quizas no sea necesario lo de arriba
    const { ...newUser }: IUser = (req.body)
    console.log(newUser)
    try {
        const payload : IUser = await userModel.create({
            ...newUser
        })
        return res.status(201).json({ Payload: payload, message: "User Creado" })
    } catch (error: any ) {
        console.log(error)
        return res.status(500).json({
            message: " we couldn't complete your request",
            error: error
        })
    }
}

export default insertUser