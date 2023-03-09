import express from "express"
import routes from "./routes/index"
import cors from "cors"
import "./config/connectionDB.ts"
import dotenv from "dotenv"
import redirect from "./controllers/redirect"

const app= express()
const PORT = 3005
dotenv.config();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use("/chainsawurl", routes)
app.post("/chainsaw/:url", redirect )

app.listen(PORT, 
    ()=>{
        console.log(`Server in port ${PORT}`)
    })