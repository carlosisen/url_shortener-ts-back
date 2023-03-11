import { Router } from "express"
import validateToken from "../middlewares/validateToken"
import { getAllUrl } from "../controllers/url"

const urlRouter = Router()

urlRouter.get("/", validateToken, getAllUrl )

export default urlRouter