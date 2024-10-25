import mongoose from "mongoose";
import Project from "./model/Project.js";
import Session from "./model/Session.js";

mongoose.connect(
  "mongodb+srv://ginawang1021:GinaDatabases1001@cluster0.m43if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const projects = [
  {
    id: 1,
    status: false,
    totalPoints: 3,
  },
  {
    id: 2,
    status: false,
    totalPoints: 3,
  },
  {
    id: 3,
    status: false,
    totalPoints: 3,
  },
  {
    id: 3.5,
    status: false,
    totalPoints: 3,
  },
  {
    id: 4,
    status: false,
    totalPoints: 3,
  },
  {
    id: 5,
    status: false,
    totalPoints: 3,
  },
];

Project.insertMany(projects)
  .then(() => {
    console.log("Project data inserted!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(`Insert failed. Error: ${err}`);
  });

const session1 = new Session({
  name: "Resume Night",
  status: true,
});

session1
  .save()
  .then(() => {
    console.log("Session data inserted!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(`Insert failed. Error: ${err}`);
  });
