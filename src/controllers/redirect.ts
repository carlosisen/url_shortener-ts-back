import { Request, Response } from "express"
import { urlModel } from "../models/mongoModel"

const redirect = async (req: Request, res: Response) => {
            const _id: string = req.params.url
            try{
                const payload: any = await urlModel.findById(_id)
                if(payload.url){
                return res.status(200).json({msg: "estas yendo a la siguiente web", url: payload.url})}
                return res.status(400).redirect("https://www.google.com/")
            }catch(error: any){
                console.log(error)
                // redirigir a una pagina oficial de error
                return res.status(404).json({msg: "no existe esta direccion"})
            }

}

export default redirect