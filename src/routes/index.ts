import {Router} from  "express"
import registerRouter from "./register"
import urlProtectedRoutes from "./protectedRoutes"
import { loginUser } from "../controllers/user"
import { loginValidator, backValidation } from "../utils/validator"



const router= Router()

router.get("/", (_req, res)=>{
    res.status(200).json({message: "estas dentro broh"})
})
router.use("/create", registerRouter);
router.post("/login",loginValidator, backValidation, loginUser);
router.use("/url", urlProtectedRoutes)
router.post("/logout")

export default router;