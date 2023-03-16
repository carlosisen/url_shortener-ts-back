import { Router } from "express"
import registerUser from "../controllers/user"
import encryptPassword from "../middlewares/encryptPassword"
import {backValidation, userValidator} from "../utils/validator"
 
const registerRouter = Router()



registerRouter.post("/user", userValidator, backValidation ,encryptPassword, registerUser)

export default registerRouter