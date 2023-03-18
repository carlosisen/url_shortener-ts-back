import {Schema, model} from "mongoose"
import { IUrl, IUser } from "../types"


const urlSchema= new Schema( {
    url: {
            type: String ,
            required: true,
        },
    notes: {
            type: String,
            default: ""
    },
    idUser: {
        type: String,
        required: [true, "Insert a id User"],
        index: true,
    },
    uses: {
        type: Number,
        default: 0,
    }

    }, { versionKey: false, timestamps: true})
    
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "insert a valid email"]
    },
    password: {
        type: String,
        required: true 
    },

}, { versionKey: false, timestamps: true})

export const userModel= model<IUser>("users", userSchema);

export const urlModel= model<IUrl>("chainsawedUrl", urlSchema)

