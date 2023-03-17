import { Request, Response } from "express"
import { urlModel } from "../models/mongoSchemas"

const redirect = async (req: Request, res: Response) => {
            const _id: string = req.params.url
            try{
                const payload: any = await urlModel.findByIdAndUpdate(_id, {$inc: {uses: 1}}, {returnDocument: "after"})
                // hay que incluir un uso modificando el modelo.
                if(payload.url){
                    // poner redireccion
                return res.status(200).redirect(payload.url)}
                throw Error("No existe el ID")
            }catch(error: any){
                // redirigir a una pagina oficial de error
                return res.status(404).json({msg: "no existe esta direccion"})
            }

}

export const frontRedirect = async (req: Request, res: Response) => {
    const _id: string = req.params.url
    try {
        const payload: any = await urlModel.findByIdAndUpdate(_id, { $inc: { uses: 1 } }, { returnDocument: "after" })
        // hay que incluir un uso modificando el modelo.
        if (payload.url) {
            // poner redireccion
            return res.status(200).json({redirect: payload.url})
        }
        throw Error("No existe el ID")
    } catch (error: any) {
        // redirigir a una pagina oficial de error
        return res.status(404).json({ msg: "no existe esta direccion" })
    }

}

export default redirect