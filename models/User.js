import {Schema, model, models} from "mongoose";
import { date } from "yup";

const UserSchema = new Schema ({
    fullName: {
        type: String,
        required: [true, "FullName is required!"],
    },
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
},{
    timestamps: {
        type: date,
        default: Date.now()
    }
})


const User = models.User || model("User",UserSchema)

export default User;