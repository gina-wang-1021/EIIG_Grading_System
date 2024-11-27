import "../../styles/SessionCard.css";
import check from "../../assets/check.png";
import cross from "../../assets/cross.png";
import lock from "../../assets/lock.png";

function SessionCard({ session, attend }) {
  const sessionName = session.name;
  const sessionStat = session.status;
  if (!sessionStat) {
    return (
      <div className="sessionCard lockedCard">
        <p className="cabin-font">{sessionName}</p>
        <img src={lock} alt="locked" className="sesLock" />
      </div>
    );
  } else {
    if (!attend || !attend.attendance) {
      return (
        <div className="sessionCard">
          <p className="cabin-font">{sessionName}</p>
          <img src={cross} alt="didn't attend" />
        </div>
      );
    } else {
      return (
        <div className="sessionCard">
          <p className="cabin-font">{sessionName}</p>
          <img src={check} alt="attended" />
        </div>
      );
    }
  }
}

export default SessionCard;
