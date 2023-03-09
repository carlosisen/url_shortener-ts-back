import {Request, Response} from "express"
import {urlModel, userModel} from "../models/mongoModel"
import { checkUser } from "../models/user"
import UrlModel from "../models/url"
import {IUrl} from "../types"

const insertUrl= async (req: Request , res: Response) =>{
        if(!req.body){
            console.log(req.body)
          return  res.status(400).json({message: "No se ha enviado ningun dato"})
        }
        // ya tendria que haber pasa por un validator, quizas no sea necesario lo de arriba
        // comprueba si existe ya ese mail
        const existUser= await checkUser({_id: req.body.idUser})
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



export default insertUrl