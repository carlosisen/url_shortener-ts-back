import express from "express"
import routes from "./routes/index"
import cors from "cors"
import dotenv from "dotenv"
import redirect from "./controllers/redirect"
import helmet from "helmet"
import handleError  from "./middlewares/handleError"

const app= express()
const PORT = 3005
dotenv.config();
import "./config/connectionDB.ts"
app.use(helmet())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use("/chainsawurl", routes)
app.get("/chainsaw/:url", redirect )
app.use(handleError)

app.listen(PORT, 
    ()=>{
        console.log(`Server in port ${PORT}`)
    })