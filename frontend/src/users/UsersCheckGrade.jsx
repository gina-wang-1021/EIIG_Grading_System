import Header from "../Header";
import LogoutBtn from "./LogoutBtn";
import SummaryComp from "./SummaryComp";
import ProjectCard from "./ProjectCard";
import SessionCard from "./SessionCard";
import "./UsersCheckGrade.css";

function UsersCheckGrade() {
  return (
    <>
      <div id="checkGradeRoot">
        <Header />
        <div className="login">
          <p className="cabin-font">You are logged in as Gina</p>
          <LogoutBtn />
        </div>
      </div>
      <SummaryComp></SummaryComp>
      <div>
        {/* change to dynamic loading */}
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <SessionCard></SessionCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
      </div>
    </>
  );
}

export default UsersCheckGrade;
