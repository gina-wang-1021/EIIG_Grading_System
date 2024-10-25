import express from "express";
import mongoose from "mongoose";
import connection from "./db.js";
import Member from "./model/Member.js";
import Project from "./model/Project.js";
import Session from "./model/Session.js";
import ProjectScore from "./model/ProjectScore.js";
import SessionAttendance from "./model/SessionAttendance.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

// set middleware and db connection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// get user data for testing usage
app.get("/", async (req, res) => {
  const userData = req.cookies.userData ? req.cookies.userData : {};
  res.status(200).json(userData);
});

// button triggers user log in
app.post("/", async (req, res) => {
  try {
    const appName = req.body.firstName;
    const appID = Number(req.body.eiigid);

    const idCheck = await Member.findOne({ id: appID });

    if (idCheck && idCheck.firstName == appName) {
      res.cookie(
        "userData",
        { name: String(appName), id: appID },
        { maxAge: 100000 }
      );
      res.status(200).send("ok");
    } else {
      res.status(400).send("user not found");
    }
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});

// useEffect() fetches user grade by ID
app.get("/grades", (req, res) => {
  try {
    if (!req.cookies.userData) {
      // next version: direct to user log in or pop up and then back to log in
      return res.status(400).send("User not found");
    }
    const appID = req.cookies.userData.id;
    const appName = req.cookies.userData.name;
    // next version: fetching data

    res.status(200).json({ this: "placeholder" });
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});

// log out button triggers this. user log out.
app.get("/grades/logout", (req, res) => {
  res.clearCookie("userData");
  res.send("user logout successfully");
});

// after data review, final update button triggers this. Updates users score or attendance.
app.put("/grades", async (req, res) => {
  try {
    const requireType = req.body.requirement;
    const appID = req.body.memberID;
    const member = await Member.findOne({ id: appID }).then((person) => {
      return person._id;
    });

    if (requireType == "Project") {
      const project = await Project.findOne({ id: req.body.projectID }).then(
        (p) => {
          return p._id;
        }
      );

      // check if score record exists
      let scoreData = await ProjectScore.findOne({
        $and: [{ member: member }, { project: project }],
      });

      // create new if record doesn't exist
      if (!scoreData) {
        scoreData = new ProjectScore();
        scoreData.member = member;
        scoreData.project = project;
      }

      // update score & late
      scoreData.score = req.body.score;
      scoreData.late = req.body.late;
      await scoreData.save();
      res.status(200).send("successfully updated project record");
    } else if (requireType == "Session") {
      // check if record exists
      let scoreData = await SessionAttendance.findOne({
        $and: [{ member: member }, { session: "671872b5b9aa43875197833d" }],
      });

      // if not create new
      if (!scoreData) {
        scoreData = new SessionAttendance();
        scoreData.member = member;
        scoreData.session = "671872b5b9aa43875197833d";
      }

      // update attendance
      scoreData.attendance = req.body.attendance;
      await scoreData.save();
      res.status(200).send("successfully updated session record");
      // NOT COMPLETED. UPDATE MEMBER DATA FIELDS: PROJECTSCORE & SESSIONATTENDANCE
    } else {
      res.status(400).send("Cannot find requirement type");
    }
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});

// useEffect() fetches setting of all projects and sessions to populate UI
app.get("/settings", (req, res) => {});

// update button triggers this. Updates project setting
app.put("/projects", async (req, res) => {
  try {
    const projectID = Number(req.body.id);
    const project = await Project.findOne({ id: projectID });
    project.status = req.body.status;
    project.totalPoints = req.body.totalPoints;
    await project.save();
    res.status(200).send(`Updated project: ${projectID}`);
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});

// update button triggers this. Updates session setting
app.put("/sessions", async (req, res) => {
  try {
    const session = await Session.findOne({ name: "Resume Night" });
    session.status = req.body.status;
    await session.save();
    res.status(200).send("Update Resume Night settings");
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});
