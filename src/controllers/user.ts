import { Request, Response } from "express"
import { userModel } from "../models/mongoModel"
import { checkUser } from "../models/user"
import { IUser, IRegister } from "../types"
import tokenGenerator from "../utils/tokenGen"

const registerUser = async (req: Request, res: Response) => {
    if (!req.body) {
        console.log(req.body)
        return res.status(400).json({ message: "No se ha enviado ningun dato" })
    }
    // ya tendria que haber pasa por un validator, quizas no sea necesario lo de arriba
    const { ...newUser }: IRegister = (req.body)
    console.log(newUser)
    // comprueba si existe ya ese mail
    const isExisted : boolean= await checkUser({email: newUser.email.toLowerCase()})
    if(isExisted){
        return res.status(400).json({msg: "ya hay un usuario con ese email"})
    }
    try {
        let user : IUser = await userModel.create({
            ...newUser
        })
         const token = tokenGenerator(user._id)

        return res.status(201).json({user, token, message: "User Creado" })
    } catch (error: any ) {
        console.log(error)
        return res.status(500).json({
            message: " we couldn't complete your request",
            error: error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { ...newUser }: IRegister = (req.body)
    console.log(newUser)
    // comprueba si existe ya ese mail
    try{
    const user: any = await userModel.find({ email: newUser.email.toLowerCase() })
    if (user.length) {
        return res.status(200).json({ user })}
    console.log(user)
    return res.status(400).json({msg: "email or password isen't correct"})
    }catch(error){
        return res.status(400).json({error})
    }
}
export default registerUser