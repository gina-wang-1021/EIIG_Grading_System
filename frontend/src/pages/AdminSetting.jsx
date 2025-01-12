import { useState, useEffect } from "react";
import Header from "../components/Header";
import BackButton from "../components/admin/BackButton";
import SessionSettingCard from "../components/admin/SessionSettingCard";
import ProjectSettingCard from "../components/admin/ProjectSettingCard";
import fetchSettings from "../utils/fetchSettings";
import "../styles/AdminSetting.css";

//{id: 1, status: true, totalPoints: 3}

function AdminSetting() {
  const [projectSetting, setProjectSetting] = useState(null);
  const [sessionSetting, setSessionSetting] = useState(null);

  const renderCards = () => {
    let cardList = [];

    if (!projectSetting || !sessionSetting) {
      return <div className="cardsLoading cabin-font">Loading...</div>;
    }

    projectSetting.map((project) => {
      cardList.push(
        <ProjectSettingCard
          key={project.id}
          projectId={project.id}
          maxPoints={project.totalPoints}
          status={project.status}
        />
      );
    });

    sessionSetting.map((session) => {
      cardList.push(
        <SessionSettingCard
          key="ses"
          sessionName={session.name}
          status={session.status}
        ></SessionSettingCard>
      );
    });

    return cardList;
  };

  useEffect(() => {
    fetchSettings().then((result) => {
      setProjectSetting(result[0]);
      setSessionSetting(result[1]);
    });
  }, []);

  return (
    <div id="settingRoot">
      <Header />
      <BackButton />
      {renderCards()}
    </div>
  );
}

export default AdminSetting;
