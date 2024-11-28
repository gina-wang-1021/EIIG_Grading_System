import grading from "../assets/grading.jpg";
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
        <img src={grading} alt="grading" />
        <text>Update Scores</text>
      </button>
    </>
  );
}

export default AdminLanding;
