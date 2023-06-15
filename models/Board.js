import { Schema, model, models } from "mongoose";
import { date } from "yup";

const BoardSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    title: {
        type: String,
        required: [true, "Board heading is required!"],
    },

    description: {
        type: String,
        maxlength: 100,
    }
},{
    timestamps: {
        type: date,
        default: Date.now()
    }
})

const Board = models.Board || model("Board",BoardSchema)
export default Board;