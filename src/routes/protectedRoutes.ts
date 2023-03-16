import { Router } from "express"
import { insertUrl } from "../controllers/url"
import { backValidation, urlValidator } from "../utils/validator"
import validateToken from "../middlewares/validateToken"
import { getAllUrl } from "../controllers/url"

const urlRouter = Router()

urlRouter.get("/getAll", validateToken, getAllUrl )
urlRouter.post("/create", urlValidator, backValidation, validateToken, insertUrl)

export default urlRouter