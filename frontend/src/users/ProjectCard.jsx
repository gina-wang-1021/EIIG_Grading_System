import "./ProjectCard.css";

function ProjectCard({ projectID, score }) {
  const sesNum = projectID;
  return (
    <div id="projectCard">
      <p className="cabin-font">Project</p>
      <p className="cabin-font late">*late submission</p>
      <p className="cabin-font">1 / 3</p>
    </div>
  );
}

export default ProjectCard;
