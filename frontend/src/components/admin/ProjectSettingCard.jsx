import "../../styles/ProjectSettingCard.css";
import { useState } from "react";

function ProjectSettingCard(projectId, maxPoints, status) {
  maxPoints = 1;
  const [totalPoint, setTotalPoint] = useState(maxPoints);
  const [pointError, setPointError] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    if (!/^[0-9]+$/.test(totalPoint)) {
      setPointError("Total points is invalid, input field only takes numbers");
      return;
    }
  };
  return (
    <form className="projectSetCard" onSubmit={submitForm}>
      <h1 className="projectCardH1 cabin-font">Project 1</h1>
      <div className="flexContainer">
        <div className="setBtns">
          <div className="flexSetBtn">
            <p className="cabin-font">Status</p>
            <label className="switch">
              <input type="checkbox" />
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
