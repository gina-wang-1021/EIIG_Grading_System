// const express = require("express");
// const mongoose = require("mongoose");
// const connection = require("./db");
import express from "express";
import mongoose from "mongoose";
import connection from "./db.js";
import Member from "./model/Member.js";
import Project from "./model/Project.js";
import Session from "./model/Session.js";
import ProjectScore from "./model/ProjectScore.js";
import SessionAttendance from "./model/SessionAttendance.js";

const app = express();
const PORT = 3000;

// set middleware and db connection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.post("/", async (req, res) => {
  try {
    const appName = req.body.name;
    const appID = Number(req.body.eiigid);

    const idCheck = await Member.findOne({ id: appID });

    if (idCheck && idCheck.name == appName) {
      res.status(200).send("ok");
    } else {
      res.status(400).send("user not found");
    }
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});
