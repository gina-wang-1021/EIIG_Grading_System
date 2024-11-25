import ProjectCard from "./ProjectCard";
import SessionCard from "./SessionCard";
import "./CardList.css";
import { useState, useEffect } from "react";

function CardList({ userData, settingData }) {
  const [projectData, setProjectData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [projectSet, setProjectSet] = useState([]);
  const [sessionSet, setSessionSet] = useState([]);
  const [total, setTotal] = useState([]);

  const renderCards = (
    projectData,
    sessionData,
    projectSet,
    sessionSet,
    total
  ) => {
    if (
      !projectData.length ||
      !sessionData.length ||
      !projectSet.length ||
      !sessionSet.length ||
      !total.length
    ) {
      return <div>Loading...</div>;
    }
    const projects = total[0];
    const sessions = total[1];
    let projectNum = 0;
    let sessionNum = 0;
    let finalRender = [];

    for (let i = 0; i < projects; i++) {
      // improve with condition ? true : false
      if (projectSet[i].status === true) {
        if (projectSet[i].id === projectData[projectNum].project.id) {
          // load project id, late status, score and total score
          finalRender.push(
            <ProjectCard
              key={i}
              projectID={projectSet[i]}
              score={projectData[projectNum]}
            ></ProjectCard>
          );
          projectNum += 1;
        } else {
          // load project id, put dash as record
          finalRender.push(
            <ProjectCard
              key={i}
              projectID={projectSet[i]}
              score={"no record"}
            ></ProjectCard>
          );
        }
      } else {
        if (projectSet[i].id === projectData[projectNum].project.id) {
          projectNum += 1;
        }
        // load project id, set icon and style
        finalRender.push(
          <ProjectCard
            key={i}
            projectID={projectSet[i]}
            score={"not open"}
          ></ProjectCard>
        );
      }
    }
    for (let i = 0; i < sessions; i++) {
      if (sessionSet[i].status === true) {
        if (sessionSet[i].id === sessionData[sessionNum].session.id) {
          // load session id and attendance
          finalRender.push(
            <SessionCard
              key={"ses"}
              sessionID={sessionSet[i]}
              attend={sessionData[sessionNum]}
            ></SessionCard>
          );
          sessionNum += 1;
        } else {
          // load session id, put dash as record
          finalRender.push(
            <SessionCard
              key={"ses"}
              sessionID={sessionSet[i]}
              attend={"no record"}
            ></SessionCard>
          );
        }
      } else {
        if (sessionSet[i].id === sessionData[sessionNum].session.id) {
          sessionNum += 1;
          // load session id, set icon and style
          finalRender.push(
            <SessionCard
              key={"ses"}
              sessionID={sessionSet[i]}
              attend={"not open"}
            ></SessionCard>
          );
        }
      }
    }
    return finalRender;
  };

  const totalNum = async () => {
    let data = await fetch("http://localhost:3000/grades/macro", {
      method: "GET",
      credentials: "include",
    });
    data = await data.json();
    return [data.projectCount, data.sessionCount];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData || userData.length === 0) {
          return;
        }

        setProjectData(userData[0]);
        setSessionData(userData[1]);

        const totals = await totalNum();
        setTotal(totals);
      } catch (err) {
        console.log("Something went wrong: ", err);
      }
    };

    const fetchSetting = async () => {
      try {
        if (!settingData || settingData.length === 0) {
          return;
        }

        setProjectSet(settingData[0]);
        setSessionSet(settingData[1]);
      } catch (err) {
        console.log("Something went wrong: ".err);
      }
    };
    fetchData();
    fetchSetting();
  }, [userData, settingData]);

  return (
    <div id="allCards">
      {renderCards(projectData, sessionData, projectSet, sessionSet, total)}
      <p className="cabin-font">
        (For questions regarding your grades, please reach out to Catherine via
        Slack.)
      </p>
    </div>
  );
}

export default CardList;
