import "../../styles/ProjectSettingCard.css";
import { useState } from "react";

function ProjectSettingCard({ projectId, maxPoints, status }) {
  const [totalPoint, setTotalPoint] = useState(maxPoints);
  const [projectStatus, setProjectStatus] = useState(status);
  const [pointError, setPointError] = useState("");

  const handleToggle = () => {
    setProjectStatus(!projectStatus);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (!/^[0-9]+$/.test(totalPoint)) {
      setPointError("Total points is invalid, input field only takes numbers");
      return;
    }

    try {
      // submit data
      const response = await fetch("http://localhost:3000/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: projectId,
          status: projectStatus,
          totalPoints: totalPoint,
        }),
      });

      if (response.status != 200) {
        alert("Server side error");
        return false;
      }
      alert("successful update");
      return true;
      // based on return value create popup
    } catch (err) {
      alert("something went wrong...", err);
      return false;
    }
  };
  return (
    <form className="projectSetCard" onSubmit={submitForm}>
      <h1 className="projectCardH1 cabin-font">Project {projectId}</h1>
      <div className="flexContainer">
        <div className="setBtns">
          <div className="flexSetBtn">
            <p className="cabin-font">Status</p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={handleToggle}
                checked={projectStatus}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setTotal">
            <label className="cabin-font">Total Points</label>
            <div>
              <input
                type="text"
                value={totalPoint}
                className={`cabin-font ${pointError ? "error" : ""}`}
                onChange={(e) => {
                  setTotalPoint(e.target.value);
                }}
                onFocus={() => {
                  setPointError("");
                }}
              />
              {pointError && (
                <p className="errorMessage cabin-font">{pointError}</p>
              )}
            </div>
          </div>
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

export default ProjectSettingCard;
