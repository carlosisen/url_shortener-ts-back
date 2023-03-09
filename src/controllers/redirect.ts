import { Request, Response } from "express"
import { urlModel } from "../models/mongoModel"

const redirect = async (req: Request, res: Response) => {
            const _id: string = req.params.url
            try{
                const payload: any = await urlModel.findById(_id)
                console.log("fallo en try" ,_id, payload)
                if(payload.url)
                return res.status(200).redirect("https://www.google.com/")
            }catch(error: any){
                console.log(error)
                // redirigir a una pagina oficial de error
                return res.status(404).end()
            }

}

export default redirect