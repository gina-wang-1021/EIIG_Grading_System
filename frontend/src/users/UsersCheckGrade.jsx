import Header from "../Header";
import LogoutBtn from "./LogoutBtn";
import SummaryComp from "./SummaryComp";
import CardList from "./CardList";
import "./UsersCheckGrade.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UsersCheckGrade() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [settingData, setSettingData] = useState([]);

  const checkAuth = async () => {
    const response = await fetch("http://localhost:3000/authorization", {
      credentials: "include",
    });

    if (response.status !== 200) {
      return false;
    }
    return true;
  };

  const fetchScoreData = async () => {
    try {
      const dataResponse = await fetch("http://localhost:3000/grades", {
        method: "GET",
        credentials: "include",
      });
      if (dataResponse.status === 400) {
        // pop up and redirect
        return "user not logged in";
      }
      if (dataResponse.status === 500) {
        console.log(dataResponse);
        return;
      }
      const data = await dataResponse.json();
      return JSON.parse(data);
    } catch (err) {
      // create pop out: something went wrong
      console.log("Something went wrong: ", err);
    }
  };

  const fetchSettings = async () => {
    try {
      const settingsData = await fetch("http://localhost:3000/settings", {
        method: "GET",
        credentials: "include",
      });
      if (settingsData.status !== 200) {
        console.log(settingsData);
        return;
      }
      const settings = await settingsData.json();
      return JSON.parse(settings);
    } catch (err) {
      console.log("Something went wrong fetching settings:", err);
    }
  };

  useEffect(() => {
    try {
      checkAuth().then((auth) => {
        if (!auth) {
          console.log("navigating to /");
          navigate("/");
          return;
        }
        fetchScoreData().then((data) => {
          if (!data) {
            navigate("/");
            return;
          }
          if (data === "user not logged in") {
            navigate("/");
            return;
          }
          setUserData(data);
          fetchSettings().then((data) => {
            if (!data) {
              navigate("/");
              return;
            }
            setSettingData(data);
          });
        });
      });
    } catch (err) {
      // send pop out instead of console log
      console.log("Error verifying authentication:", err);
      navigate("/");
    }
  }, []);

  return (
    <>
      <div id="checkGradeRoot">
        <Header />
        <div className="login">
          <p className="cabin-font loginText">You are logged in as Gina</p>
          <LogoutBtn />
        </div>
        <SummaryComp></SummaryComp>
        <CardList userData={userData} settingData={settingData}></CardList>
        <p className="cabin-font lastComment">🎉 Good Luck with Everything! </p>
      </div>
    </>
  );
}

export default UsersCheckGrade;
