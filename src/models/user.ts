import { userModel } from "./mongoSchemas"

export const checkUser= async (date: object) =>{
        try{
            const payload= await userModel.exists(date)
            console.log(payload, "userFind")
            if(payload !== null){
                return true}
            return false
        }catch{
            return false
        }
}