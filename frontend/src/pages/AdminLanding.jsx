import grading from "../assets/grade.png";
import settings from "../assets/settings.png";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLanding.css";

function AdminLanding() {
  const navigate = useNavigate();

  return (
    <>
      <div id="adminRoot">
        <Header />
        <div id="adminFlexBox">
          <button
            className="adminBtn cabin-font"
            id="btn1"
            onClick={() => navigate("/admin/setting")}
          >
            <img src={settings} alt="settings" />
            <p>Project Settings</p>
          </button>
          <button
            className="adminBtn cabin-font"
            id="btn2"
            onClick={() => navigate("/admin/scores")}
          >
            <img src={grading} alt="grading" />
            <p>Update Scores</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminLanding;
