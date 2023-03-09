import {Request, Response} from "express"
import {urlModel} from "../models/mongoModel"
import {IUrl} from "../types"

const insertUrl= async (req: Request , res: Response) =>{
        if(!req.body){
            console.log(req.body)
          return  res.status(400).json({message: "No se ha enviado ningun dato"})
        }
        // ya tendria que haber pasa por un validator, quizas no sea necesario lo de arriba
        const {...newUrl} : IUrl = (req.body)
        console.log(newUrl)
        try{
            const payload : IUrl = await urlModel.create({
                ...newUrl
            })
            return res.status(201).json({payload: payload, message: "Creado"})
        }catch(error : any){
            console.log(error)
            return res.status(500).json({
                message: " we couldn't complete your request",
                error: error
            })
        
}}



export default insertUrl