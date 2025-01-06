import express from "express";
import cors from "cors";
import connection from "./db.js";
import Member from "./model/Member.js";
import Project from "./model/Project.js";
import Session from "./model/Session.js";
import ProjectScore from "./model/ProjectScore.js";
import SessionAttendance from "./model/SessionAttendance.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:5173", // allow only this origin
  credentials: true,
};

app.use(cors(corsOptions));

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
    const appName = req.body.nameValue.toLowerCase();
    const appID = Number(req.body.idValue);

    let idCheck = await Member.findOne({ id: appID });

    if (idCheck && idCheck.firstName === appName) {
      res.cookie(
        "userData",
        { name: appName, id: appID },
        {
          maxAge: 100000,
          httpOnly: true,
          sameSite: "Lax",
          secure: false,
          path: "/",
        }
      );
      res.status(200).json({ message: "ok" });
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `Something went wrong... Error: ${err}` });
  }
});

// check user authorization to prevent unauthorized access
app.get("/authorization", async (req, res) => {
  try {
    const userData = req.cookies.userData;
    if (!userData) {
      return res.status(401).json({ auth: false });
    }
    const userName = userData.name;
    res.status(200).json({ auth: true, name: userName });
  } catch (err) {
    res.status(500).json({ auth: "Something went wrong" });
  }
});

// useEffect() fetches all grades by member ID to populate UI.
app.get("/grades", async (req, res) => {
  try {
    if (!req.cookies.userData) {
      return res.status(400).json({ data: "user not logged in" });
      // frontend receives this and then sends a pop up, then direct back to user log in
    }
    const appID = req.cookies.userData.id;
    const appName = req.cookies.userData.name;
    const applicant = await Member.findOne({
      $and: [{ id: appID }, { firstName: appName }],
    });

    let projectRecord = await ProjectScore.find(
      { member: applicant._id },
      { member: 0, _id: 0, __v: 0 }
    )
      .populate({
        path: "project",
        select: "-__v -_id",
      })
      .sort({ project: 1 });
    let sessionRecord = await SessionAttendance.find(
      { member: applicant._id },
      { member: 0, _id: 0, __v: 0 }
    )
      .populate({
        path: "session",
        select: "-_id -__v",
      })
      .sort({ project: 1 });
    let records = [];
    records.push(projectRecord);
    records.push(sessionRecord);

    records = JSON.stringify(records);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});

app.get("/grades/macro", async (req, res) => {
  try {
    let totalCount = [];
    totalCount[0] = await Project.countDocuments();
    totalCount[1] = await Session.countDocuments();
    return res.status(200).json({
      projectCount: totalCount[0],
      sessionCount: totalCount[1],
    });
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});

// log out button triggers this. user log out.
app.get("/grades/logout", (req, res) => {
  console.log("Clearing cookie:", req.cookies.userData);
  res.clearCookie("userData", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
    path: "/",
  });
  res.json({ message: "logged out successfully" });
});

// after data review, final update button triggers this. Updates users score or attendance.
app.put("/grades", async (req, res) => {
  try {
    const requireType = req.body.requirement;
    const appID = req.body.memberID;
    const member = await Member.findOne({ id: appID });

    if (!member) {
      return res.status(400).send("Member doesn't exist");
    }
    console.log("found member");

    if (requireType == "Project") {
      console.log("updating project data");
      const project = await Project.findOne({ id: req.body.projectID }).then(
        (p) => {
          if (!p) {
            return null;
          }
          return p._id;
        }
      );

      if (!project) {
        return res.status(400).send("Project doesn't exist");
      }

      // check if score record exists
      let scoreData = await ProjectScore.findOne({
        $and: [{ member: member._id }, { project: project }],
      });

      // create new if record doesn't exist
      if (!scoreData) {
        console.log("No score data exists, creating new record");
        scoreData = new ProjectScore();
        scoreData.member = member._id;
        scoreData.project = project;
        member.projectScore.push(scoreData._id);
        await member.save();
      }

      // update score & late
      scoreData.score = req.body.score;
      scoreData.late = req.body.late;
      await scoreData.save();
      res.status(200).send("successfully updated project record");
    } else if (requireType == "Session") {
      console.log("updating session data");
      // check if record exists
      let scoreData = await SessionAttendance.findOne({
        $and: [{ member: member._id }, { session: "671872b5b9aa43875197833d" }],
      });

      // if not create new
      if (!scoreData) {
        console.log("no session attendance exist, creating new record");
        scoreData = new SessionAttendance();
        scoreData.member = member._id;
        scoreData.session = "671872b5b9aa43875197833d";
        member.sessionAttend.push(scoreData._id);
        await member.save();
      }

      // update attendance
      scoreData.attendance = req.body.attendance;
      await scoreData.save();
      res.status(200).send("successfully updated session record");
    } else {
      res.status(400).send("Cannot find requirement type");
    }
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});

// useEffect() fetches setting of all projects and sessions to populate UI
app.get("/settings", async (req, res) => {
  try {
    let allSetting = [];
    let settingData = await Project.find({}, { _id: 0, __v: 0 }).sort({
      id: 1,
    });
    let settingData2 = await Session.find({}, { _id: 0, __v: 0 }).sort({
      id: 1,
    });
    allSetting.push(settingData);
    allSetting.push(settingData2);
    allSetting = JSON.stringify(allSetting);
    res.status(200).json(allSetting);
  } catch (err) {
    res.status(500).send(`Something went wrong... Error: ${err}`);
  }
});

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
