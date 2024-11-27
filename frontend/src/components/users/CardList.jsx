import ProjectCard from "./ProjectCard";
import SessionCard from "./SessionCard";
import "../../styles/CardList.css";
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
      return <div className="cabin-font loading">Loading...</div>;
    }
    const projects = total[0];
    const sessions = total[1];
    let projectNum = 0;
    let sessionNum = 0;
    let finalRender = [];

    // improve pulling and populating data fields
    for (let i = 0; i < projects; i++) {
      const scoreExist =
        projectSet[i].status === true &&
        projectSet[i].id === projectData[projectNum].project.id
          ? true
          : false;
      finalRender.push(
        <ProjectCard
          key={i}
          project={projectSet[i]}
          score={scoreExist ? projectData[projectNum] : null}
        ></ProjectCard>
      );
      if (scoreExist) {
        projectNum += 1;
      }
    }

    // improve pulling and populating data fields
    for (let i = 0; i < sessions; i++) {
      const scoreExist =
        sessionSet[i].status === true &&
        sessionData[sessionNum].attendance === ("excused" || "yes")
          ? true
          : false;
      finalRender.push(
        <SessionCard
          key={"ses"}
          session={sessionSet[i]}
          attend={scoreExist ? sessionData[sessionNum] : null}
        ></SessionCard>
      );
      if (scoreExist) {
        sessionNum += 1;
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
