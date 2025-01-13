import "../../styles/LogoutBtn.css";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const logout = async () => {
    await fetch(`${backendUrl}/grades/logout`, {
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
