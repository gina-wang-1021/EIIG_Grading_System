import Header from "../components/Header";
import LogoutBtn from "../components/users/LogoutBtn";
import SummaryComp from "../components/users/SummaryComp";
import CardList from "../components/users/CardList";
import "../styles/UsersCheckGrade.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UsersCheckGrade() {
  // future version: fetch data in Landing page after authorization, pass in as props then stored as local variables
  const navigate = useNavigate();
  const [fName, setFName] = useState(null);
  const [userData, setUserData] = useState([]);
  const [settingData, setSettingData] = useState([]);

  const checkAuth = async () => {
    let response = await fetch("http://localhost:3000/authorization", {
      credentials: "include",
    });

    if (response.status !== 200) {
      return false;
    }
    response = await response.json();
    const firstName = await response.name;
    setFName(firstName);
    return true;
  };

  const fetchScoreData = async () => {
    try {
      const dataResponse = await fetch("http://localhost:3000/grades", {
        method: "GET",
        credentials: "include",
      });
      if (dataResponse.status === 400) {
        // popup
        console.log("User not logged in");
        return;
      }
      if (dataResponse.status === 500) {
        // popup
        console.log("server error:", dataResponse);
        return;
      }
      const data = await dataResponse.json();
      return JSON.parse(data);
    } catch (err) {
      // popup
      console.log("Something went wrong: ", err);
      return;
    }
  };

  const fetchSettings = async () => {
    try {
      const settingsData = await fetch("http://localhost:3000/settings", {
        method: "GET",
        credentials: "include",
      });
      if (settingsData.status !== 200) {
        console.log("server error: ", settingsData);
        return;
      }
      const settings = await settingsData.json();
      return JSON.parse(settings);
    } catch (err) {
      // popup
      console.log("Something went wrong fetching settings:", err);
      return;
    }
  };

  const fetchAllData = async () => {
    try {
      const auth = await checkAuth();
      if (!auth) {
        console.log("user not logged in");
        navigate("/");
        return;
      }

      const [scoreData, settingsData] = await Promise.all([
        fetchScoreData(),
        fetchSettings(),
      ]);

      if (!scoreData || !settingsData) {
        console.error("Error fetching data.");
        navigate("/");
        return;
      }

      setUserData(scoreData);
      setSettingData(settingsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [navigate]);

  return (
    <>
      <div id="checkGradeRoot">
        <Header />
        <div className="login">
          <p className="cabin-font loginText">You are logged in as {fName}</p>
          <LogoutBtn />
        </div>
        <SummaryComp
          userData={userData}
          settingData={settingData}
        ></SummaryComp>
        <CardList userData={userData} settingData={settingData}></CardList>
        <p className="cabin-font lastComment">🎉 Good Luck with Everything! </p>
      </div>
    </>
  );
}

export default UsersCheckGrade;