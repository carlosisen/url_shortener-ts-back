import { Request, Response } from "express"
import { urlModel } from "../models/mongoSchemas"

const redirect = async (req: Request, res: Response) => {
            const _id: string = req.params.url
            try{
                const payload: any = await urlModel.findByIdAndUpdate(_id, {$inc: {uses: 1}}, {returnDocument: "after"})
                if(payload.url){
                return res.status(200).redirect(payload.url)}
                throw Error("No existe el ID")
            }catch(error: any){
                return res.status(404).json({msg: "no existe esta direccion"})
            }

}

export const frontRedirect = async (req: Request, res: Response) => {
    const _id: string = req.params.url
    try {
        const payload: any = await urlModel.findByIdAndUpdate(_id, { $inc: { uses: 1 } }, { returnDocument: "after" })
        if (payload.url) {
            return res.status(200).json({redirect: payload.url})
        }
        throw Error("No existe el ID")
    } catch (error: any) {
        return res.status(404).json({ msg: "no existe esta direccion" })
    }

}

export default redirect