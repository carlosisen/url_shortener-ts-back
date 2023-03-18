import { Request, Response } from "express"
import { userModel } from "../models/mongoSchemas"
import { checkUser } from "../models/user"
import { IUser, IRegister } from "../types"
import CryptoJS from "crypto-js"
import tokenGenerator from "../utils/tokenGen"

const registerUser = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ message: "No se ha enviado ningun dato" })
    }
    const { ...newUser }: IRegister = (req.body)
    const isExisted : boolean= await checkUser({email: newUser.email.toLowerCase()})
    if(isExisted){
        return res.status(400).json({msg: "ya hay un usuario con ese email"})
    }
    try {
        let user : any = await userModel.create({
            ...newUser
        })
        const token = tokenGenerator(user._id)
        const responseData : IUser= {...user._doc, token}

        return res.status(201).json({user: {...responseData}, message: "User Creado" })
    } catch (error: any ) {
        return res.status(500).json({
            message: " we couldn't complete your request",
            error: error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { ...userDataReq }: IRegister = (req.body)
    try{
        const user: any = await userModel.find({ email: userDataReq.email.toLowerCase() })
        if (!user.length) {
           throw Error("email or password isen't correct")}
        const password: string = CryptoJS.AES.decrypt(user[0].password, process.env.SECRET_CRYPTO as string).toString(CryptoJS.enc.Utf8)
        if(userDataReq.password === password){
        const token = tokenGenerator(user[0]._id)
        const userData :IUser= {
            _id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            createdAt: user[0].createdAt,
            updatedAt: user[0].updatedAt,
            token: token
        }
        return res.status(200).json({user: {...userData} })
        }
       throw Error("email or password isen't correct")
        
    }catch(error: any){
        const errorMsg= error.message
        return res.status(400).json({error: errorMsg})
    }
}
export default registerUser