// schema for members
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MemberSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  firstName: String,
  projectScore: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectScore" }],
  sessionAttend: [
    { type: mongoose.Schema.Types.ObjectId, ref: "SessionAttendance" },
  ],
});

const Member = model("Member", MemberSchema);
export default Member;
