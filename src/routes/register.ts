import { Router } from "express"
import insertUrl from "../controllers/url"
import registerUser from "../controllers/user"
import validateToken from "../middlewares/validateToken"

const registerRouter = Router()


registerRouter.post("/url", validateToken, insertUrl)

registerRouter.post("/user", registerUser)

export default registerRouter