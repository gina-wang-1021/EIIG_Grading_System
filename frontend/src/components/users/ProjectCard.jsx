import "../../styles/ProjectCard.css";
import lock from "../../assets/lock.png";

function ProjectCard({ project, score }) {
  const projectID = project.id;
  const projectStatus = project.status;
  const maxScore = project.totalPoints;

  if (!projectStatus) {
    return (
      <div className="projectCard lockedCard">
        <p className="cabin-font">Project {projectID}</p>
        <img src={lock} alt="locked" className="projectLock" />
      </div>
    );
  } else {
    if (!score) {
      return (
        <div className="projectCard">
          <p className="cabin-font">Project {projectID}</p>
          <p className="cabin-font late">*missing</p>
          <p className="cabin-font">- / {maxScore}</p>
        </div>
      );
    } else {
      const late = score.late || false;
      const userScore = score.score;
      return (
        <div className="projectCard">
          <p className="cabin-font">Project {projectID}</p>
          {late && <p className="cabin-font late">*late submission</p>}
          <p className="cabin-font">
            {userScore} / {maxScore}
          </p>
        </div>
      );
    }
  }
}

export default ProjectCard;
