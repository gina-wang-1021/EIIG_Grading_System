import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProjectScoreSchema = new Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  score: Number,
  late: Boolean,
});

const ProjectScore = model("ProjectScore", ProjectScoreSchema);
export default ProjectScore;
