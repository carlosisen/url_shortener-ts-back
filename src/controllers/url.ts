import {Request, Response} from "express"
import {urlModel, userModel} from "../models/mongoModel"
import { checkUser } from "../models/user"
import UrlModel from "../models/url"
import {IUrl} from "../types"

export const insertUrl= async (req: Request , res: Response) =>{
        // ya tendria que haber pasa por un validator
        // comprueba si existe ya ese mail
        const id : string = req.body.idUser 
        const existUser= await checkUser({_id: id})
        console.log(existUser, "existe usuario")
        if (!existUser){
            return res.status(400).json({message: "user not found"})
        }
        const {...newUrl} : IUrl = (req.body)
        console.log(newUrl)
        try{
            const payload : IUrl = await urlModel.create({
                ...newUrl
            })
            const shortedURL = UrlModel.createUrl(payload._id as string)
            return res.status(201).json({payload: payload, shortedURL,  message: "Creado"})
        }catch(error : any){
            console.log(error)
            return res.status(500).json({
                message: " we couldn't complete your request",
                error: error
            })
        
}}



export const getAllUrl = async (req: Request, res: Response)=> {
        try{
            const existUser = await checkUser({ _id: req.body.idUser })
            if (!existUser) {
                throw Error( "user not found" )
            }
            const allUrl = await urlModel.find({idUser : req.body.idUser})
            console.log(allUrl)
            return res.status(200).json(allUrl)
        }catch(error : any){
            return res.status(400).json({
                    error: error.message
            })
        }
}