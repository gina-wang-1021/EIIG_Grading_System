import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProjectSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  status: Boolean,
  totalPoints: Number,
});

const Project = model("Project", ProjectSchema);
export default Project;
