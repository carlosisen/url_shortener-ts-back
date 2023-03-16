import {NextFunction, Request, Response} from "express"
import {urlModel, userModel} from "../models/mongoSchemas"
import { checkUser } from "../models/user"
import UrlModel from "../models/url"
import {IUrl} from "../types"
import CustomError from "../utils/customError"

export const insertUrl= async (req: Request , res: Response, next : NextFunction) =>{

        const id : string = req.body.idUser 
        try{
            const existUser= await checkUser({_id: id})
            console.log(existUser, "existe usuario")
            if (!existUser){
                throw new CustomError(400, "user not found", "custom")
            }
            const {...newUrl} : IUrl = (req.body)
            console.log(newUrl)
            const payload : IUrl = await urlModel.create({
                ...newUrl
            })
            const shortedURL = UrlModel.createUrl(payload._id as string)
            return res.status(201).json({url: [payload], shortedURL,  message: "Creado"})
        }catch(error : any){
            console.log(error)
            return next(error)
        
}}

export const getAllUrl = async (req: Request, res: Response, next: NextFunction)=> {
        try{
            const existUser = await checkUser({ _id: req.body.idUser })
            if (!existUser) {
                throw new CustomError(400, "user not found", "custom" )
            }
            const allUrl = await urlModel.find({idUser : req.body.idUser})
            console.log(allUrl)
            return res.status(200).json(allUrl)
        }catch(error : any){
            return next(error)
            }
        }

export const deleteUrl = async (req: Request, res: Response, next: NextFunction) => {
    const{idUser, idUrl}= req.body
    try {
        const existUser = await checkUser({ _id: idUser })
        if (!existUser) {
            throw new CustomError(400, "not found your user", "custom" )
        }
        const urlDeleted = await urlModel.findByIdAndDelete(idUrl)
        if( urlDeleted === null) {
            throw new CustomError( 400 ,"url doesn't exist ", "custom")
        }
        console.log(urlDeleted, "esta borrado")
        return res.status(204).send({msg: "url Deleted"})
    }catch(err) {
        return next(err)
        }
    }

export const updateUrl= async (req: Request, res: Response, next: NextFunction) => {
        const{url , notes , idUser, idUrl} = req.body
        try{
            const existUser = await checkUser({ _id: idUser })
            if (!existUser) 
                throw new CustomError(400, "not found your user", "custom");
            const urlUpdated = await urlModel.findByIdAndUpdate(idUrl, {url: url, notes: notes}, {returnDocument: "after"})
            return res.status(201).send({ url: urlUpdated })
        }catch(error){
            return next(error)
        }

}