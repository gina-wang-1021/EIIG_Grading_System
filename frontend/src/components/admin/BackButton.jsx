import "../../styles/BackButton.css";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      id="adminBackBtn"
      className="cabin-font"
      onClick={() => navigate("/admin")}
    >
      Back
    </button>
  );
}

export default BackButton;
