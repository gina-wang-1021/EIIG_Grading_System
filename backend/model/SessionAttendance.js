import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SessionAttendanceSchema = new Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member'" },
  session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
  attendance: String,
});

const SessionAttendance = model("SessionAttendance", SessionAttendanceSchema);
export default SessionAttendance;
