import { Router } from "express"
import { insertUrl, getAllUrl, deleteUrl, updateUrl } from "../controllers/url"
import { backValidation, urlValidator } from "../utils/validator"
import validateToken from "../middlewares/validateToken"

const urlRouter = Router()

urlRouter.get("/getall", validateToken,  getAllUrl )
urlRouter.post("/create", urlValidator, backValidation, validateToken, insertUrl)
urlRouter.delete("/delete", validateToken,  deleteUrl)
urlRouter.post("/update", validateToken,  updateUrl)

export default urlRouter