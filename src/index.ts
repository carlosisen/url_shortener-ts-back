import express from "express"
import routes from "./routes/index"
import cors from "cors"
import "./config/connectionDB.ts"
import dotenv from "dotenv"
import redirect from "./controllers/redirect"
import helmet from "helmet"
import swaggerJsdoc from "swagger-jsdoc"; 
import swaggerUi from "swagger-ui-express" ;

const app= express()
const PORT = 3005
dotenv.config();
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [{
            url: "http://localhost:3005",
        },
        ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);
app.use(helmet())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use("/chainsawurl", routes)
app.get("/chainsaw/:url", redirect )

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.listen(PORT, 
    ()=>{
        console.log(`Server in port ${PORT}`)
    })