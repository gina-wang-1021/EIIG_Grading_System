import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SessionSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  status: Boolean,
});

const Session = model("Session", SessionSchema);
export default Session;
