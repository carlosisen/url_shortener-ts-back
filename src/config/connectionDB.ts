import mongoose from "mongoose";

const DB= {
        URL: process.env.MONGODB_URL || "mongodb://localhost/chainsawUrl",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD,
    }

mongoose.connect(DB.URL)
const connection = mongoose.connection

connection.once( "open", ()=>
    console.log("connected to mongo ")
)
connection.on("error", (error)=> {
    console.log(error)
})
