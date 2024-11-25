import "./SessionCard.css";
import check from "../assets/check.png";
import cross from "../assets/cross.png";

function SessionCard({ sessionID, attend }) {
  return (
    <div id="sessionCard">
      <p className="cabin-font">Resume Night</p>
      <img src={check} alt="checked" />
    </div>
  );
}

export default SessionCard;
