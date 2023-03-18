import { NextFunction, Request, Response } from "express"
import { customError } from "../types"

const handleError= ( error : customError, _req: Request, res: Response , _next: NextFunction) => { 
    switch (error.name){
        default : {
            return res.status(500).json({msg: error.message})
        }
        case "custom":{
            return res.status(error.code).json({errorMsg: error.message})
        }

    }
        

}
export default handleError