import { Schema, model, models } from "mongoose";
import { date } from "yup";

const taskSchema = new Schema ({
    title: {
        type: String,
        required: [true, "Task's title is required!"],
    },

    description: {
        type: String,
        maxlength: 60,
    },

    image: {
        type: String
    }
},{
    timestamps: true
})

const taskListSchema = new Schema({
    title: {
        type: String,
        required: [true, "List Title is required!"],
    },

    tasks: [taskSchema]
})

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
    },

    taskLists: [taskListSchema]
},{
    timestamps: {
        type: date,
        default: Date.now()
    }
})

const Board = models.Board || model("Board",BoardSchema)
export default Board;