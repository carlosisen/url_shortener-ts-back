import { Router } from "express"
import insertUrl from "../controllers/url"
import insertUser from "../controllers/user"

const registerRouter = Router()


registerRouter.post("/url", insertUrl)

registerRouter.post("/user", insertUser)

export default registerRouter