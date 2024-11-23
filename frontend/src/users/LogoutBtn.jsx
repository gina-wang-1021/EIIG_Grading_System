import "./LogoutBtn.css";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();
  const logout = async () => {
    await fetch("http://localhost:3000/grades/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(navigate("/"))
      .catch((error) => console.error("Error:", error));
  };
  return (
    <button id="logoutBtn" className="cabin-font" onClick={logout}>
      Log Out
    </button>
  );
}

export default LogoutBtn;
