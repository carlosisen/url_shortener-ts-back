import { Router } from "express"
import {insertUrl} from "../controllers/url"
import registerUser from "../controllers/user"
import validateToken from "../middlewares/validateToken"
import encryptPassword from "../middlewares/encryptPassword"

const registerRouter = Router()


registerRouter.post("/url", validateToken, insertUrl)

registerRouter.post("/user",encryptPassword, registerUser)

export default registerRouter