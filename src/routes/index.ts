import {Router} from  "express"
import registerRouter from "./register"
import urlRouter from "./page"
import { loginUser } from "../controllers/user"


const router= Router()

router.get("/", (_req, res)=>{
    res.status(200).json({message: "estas dentro broh"})
})
router.use("/create", registerRouter);
router.post("/login", loginUser);
router.use("/url", urlRouter)
router.post("/logout")

export default router;