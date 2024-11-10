import mongoose from "mongoose";



const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
     ref: "User",
  },
 
  image: {
    type: String,
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "private",
  }
  //Pruebas
},
  { timestamps: true }
)

export default mongoose.model("Task", taskSchema)