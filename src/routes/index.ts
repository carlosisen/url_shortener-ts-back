import {Router} from  "express"
import registerRouter from "./register"

const router= Router()

router.get("/", (_req, res)=>{
    res.status(200).json({message: "estas dentro broh"})
})
router.use("/create", registerRouter);
router.post("/login");
router.post("/logout")

export default router;