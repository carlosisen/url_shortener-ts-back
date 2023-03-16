import { userModel } from "./mongoSchemas"
import CustomError from "../utils/customError"

export const checkUser= async (date: object) =>{
        try{
            const payload= await userModel.exists(date)
            console.log(payload, "userFind")
            if(payload !== null){
                return true}
            return false
        }catch{
            throw new CustomError(400, "sorry, server has failed", "custom" )
        }
}