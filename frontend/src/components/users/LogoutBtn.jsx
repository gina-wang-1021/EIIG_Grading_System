import "../../styles/LogoutBtn.css";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();
  const logout = async () => {
    await fetch("http://localhost:3000/grades/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <button id="logoutBtn" className="cabin-font" onClick={logout}>
      Log Out
    </button>
  );
}

export default LogoutBtn;
