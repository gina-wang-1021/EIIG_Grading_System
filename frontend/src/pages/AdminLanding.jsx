import gradings from "../assets/grading.jpg";
import settings from "../assets/setting.jpg";
import Header from "../components/Header";

function AdminLanding() {
  return (
    <>
      <Header />
      <button>
        <img src={settings} alt="settings" />
        <text>Project Settings</text>
      </button>
      <button>
        <img src={gradings} alt="gradings" />
        <text>Update Scores</text>
      </button>
    </>
  );
}

export default AdminLanding;
