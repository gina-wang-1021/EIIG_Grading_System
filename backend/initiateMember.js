import mongoose from "mongoose";
import Member from "./model/Member.js";

mongoose.connect(
  "mongodb+srv://ginawang1021:GinaDatabases1001@cluster0.m43if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const members = [
  {
    id: 2,
    firstName: "AAA",
    lastName: "AAA",
    ProjectScore: [],
    sessionAttend: [],
  },
  {
    id: 3,
    firstName: "BBB",
    lastName: "BBB",
    ProjectScore: [],
    sessionAttend: [],
  },
  {
    id: 4,
    firstName: "CCC",
    lastName: "CCC",
    ProjectScore: [],
    sessionAttend: [],
  },
  {
    id: 5,
    firstName: "DDD",
    lastName: "DDD",
    ProjectScore: [],
    sessionAttend: [],
  },
  {
    id: 6,
    firstName: "EEE",
    lastName: "EEE",
    ProjectScore: [],
    sessionAttend: [],
  },
];

Member.insertMany(members)
  .then(() => {
    console.log("Successfully inserted member data");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(`Insert failed. Error: ${err}`);
  });