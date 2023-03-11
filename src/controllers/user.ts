import { Request, Response } from "express"
import { userModel } from "../models/mongoModel"
import { checkUser } from "../models/user"
import { IUser, IRegister } from "../types"
import CryptoJS from "crypto-js"
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
    const { ...userDataReq }: IRegister = (req.body)
    // comprueba si existe ya ese mail
    try{
        const user: any = await userModel.find({ email: userDataReq.email.toLowerCase() })
        if (!user.length) {
           throw Error("email or password isen't correct")}
        // desencriptamos la contraseña
        const password: string = CryptoJS.AES.decrypt(user[0].password, process.env.SECRET_CRYPTO as string).toString(CryptoJS.enc.Utf8)
        if(userDataReq.password === password){
        // creamos un token 
        const token = tokenGenerator(user[0]._id)
        const userData :IUser= {
            _id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            createdAt: user[0].createdAt,
            updatedAt: user[0].updatedAt,
            token: token
        }
        return res.status(200).json({ userData })
        }
        console.log(userDataReq.password,  user[0].password, password)
       throw Error("email or password isen't correct")
        
    }catch(error: any){
        console.log(error)
        const errorMsg= error.message
        return res.status(400).json({error: errorMsg})
    }
}
export default registerUser