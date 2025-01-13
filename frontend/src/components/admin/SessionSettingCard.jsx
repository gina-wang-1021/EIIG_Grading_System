import "../../styles/sessionSettingCard.css";
import { useState } from "react";

function SessionSettingCard({ sessionName, status }) {
  const [sessionOpen, setSessionOpen] = useState(status);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleToggle = () => {
    setSessionOpen(!sessionOpen);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      // submit data
      const response = await fetch(`${backendUrl}/sessions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: sessionOpen,
        }),
      });

      if (response.status != 200) {
        alert("Server side error...");
        return false;
      }
      alert("successful update!");
      return true;
      // based on return value create popup
    } catch (err) {
      alert("something went wrong...", err);
      return false;
    }
  };

  return (
    <form className="projectSetCard" onSubmit={submitForm}>
      <h1 className="projectCardH1 cabin-font">{sessionName}</h1>
      <div className="flexContainer">
        <div className="sessionSetBtn">
          <p className="cabin-font">Status</p>
          <label className="switch">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={sessionOpen}
            />
            <span className="slider"></span>
          </label>
        </div>
        <input
          id="setOkBtn"
          className="cabin-font"
          type="submit"
          value="Update"
        />
      </div>
    </form>
  );
}

export default SessionSettingCard;
