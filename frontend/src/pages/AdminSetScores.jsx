import { useState } from "react";
import "../styles/AdminSetScores.css";
import Header from "../components/Header";
import BackButton from "../components/admin/BackButton";

function AdminSetScores() {
  const [recordType, setRecordType] = useState("project");
  const [recordID, setRecordID] = useState("");
  const [errorID, setErrorID] = useState("");
  const [memberID, setMemberID] = useState("");
  const [errorMemID, setErrorMemID] = useState("");
  const [recordEnter, setRecordEnter] = useState("");
  const [errorEnter, setErrorEnter] = useState("");
  const [late, setLate] = useState(false);

  // TODO
  // check max score before sending

  const validateInput = (recordType, recordID, memberID, recordEnter) => {
    let triggered = false;
    if (recordType === "project") {
      if (!recordID || isNaN(recordID)) {
        setErrorID("Project ID needs a value and can only contain numbers");
        triggered = true;
      }
      if (!memberID || isNaN(memberID)) {
        setErrorMemID(
          "Candidate ID needs a value and can only contain numbers"
        );
        triggered = true;
      }
      if (!recordEnter || isNaN(recordEnter)) {
        setErrorEnter("Scores needs a value and can only contain numbers");
        triggered = true;
      }

      if (triggered) {
        console.log("falsy stuff");
        return false;
      }
      console.log("true stuff");
      return true;
    } else {
      if (!memberID || isNaN(memberID)) {
        setErrorMemID(
          "Candidate ID needs a value and can only contain numbers"
        );
        return false;
      }
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(recordType, recordID, memberID, recordEnter)) {
      // check if score is under max score for the project
      try {
        const response = await fetch("http://localhost:3000/grades", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requirement: recordType,
            memberID: memberID,
            projectID: recordID,
            score: recordEnter,
            late: late,
          }),
        });

        if (response.ok) {
          console.log("record updated");
          // create pop out
          setMemberID("");
          setRecordID("");
          setRecordEnter(recordType === "project" ? "" : "yes");
          setLate(false);
        } else if (response.status === 400) {
          console.log(await response.json());
          if (recordType === "project") {
            setErrorID(
              "Error occurred. Either candidate doesn't exist or project doesn't exist"
            );
          } else {
            setErrorMemID(
              "Error occurred. Either candidate doesn't exist or cannot find requirement type"
            );
          }
        } else if (response.status === 500) {
          console.log(await response.json());
        }
      } catch (e) {
        console.log(e);
      }
    }

    console.log("submitted");
  };

  return (
    <div id="settingRoot">
      <Header />
      <BackButton />
      <div className="formWrapperAdmin">
        <form onSubmit={handleSubmit}>
          <div className="flexRecordType">
            <p>Requirement Type:</p>
            <div className="projectBtnWrap">
              <button
                type="button"
                onClick={() => {
                  setRecordType("project");
                  setRecordID("");
                  setMemberID("");
                  setRecordEnter("");
                  setLate(false);
                  setErrorEnter("");
                  setErrorID("");
                  setErrorMemID("");
                }}
                className={`${recordType === "project" ? "projectSelect" : ""}`}
              >
                Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setRecordType("session");
                  setRecordEnter("yes");
                  setMemberID("");
                  setErrorMemID("");
                }}
                className={`${recordType === "session" ? "projectSelect" : ""}`}
              >
                Session
              </button>
            </div>
          </div>
          {recordType === "project" && (
            <div className="projectForm">
              <label htmlFor="ProjectID">Project ID:</label>
              <div>
                <input
                  id="ProjectID"
                  type="text"
                  value={recordID}
                  onChange={(e) => {
                    setRecordID(e.target.value);
                  }}
                  onFocus={() => setErrorID("")}
                  className={errorID ? "errAdminInput" : ""}
                />
                {errorID && <p className="errAdminMes">{errorID}</p>}
              </div>

              <label htmlFor="ProjectMemID">Candidate ID:</label>
              <div>
                <input
                  id="ProjectMemID"
                  type="text"
                  value={memberID}
                  onChange={(e) => {
                    setMemberID(e.target.value);
                  }}
                  onFocus={() => setErrorMemID("")}
                  className={errorMemID ? "errAdminInput" : ""}
                />
                {errorMemID && <p className="errAdminMes">{errorMemID}</p>}
              </div>
              <label htmlFor="ProjectScore">Score:</label>
              <div>
                <input
                  id="ProjectScore"
                  type="text"
                  value={recordEnter}
                  onChange={(e) => {
                    setRecordEnter(e.target.value);
                  }}
                  onFocus={() => setErrorEnter("")}
                  className={errorEnter ? "errAdminInput" : ""}
                />
                {errorEnter && <p className="errAdminMes">{errorEnter}</p>}
              </div>
              <label htmlFor="ProjectLate">Late:</label>
              <input
                id="ProjectLate"
                type="checkbox"
                onChange={(e) => {
                  setLate(e.target.checked);
                  console.log(e.target.checked);
                  console.log(late);
                }}
                value={late}
              />
            </div>
          )}
          {recordType === "session" && (
            <div className="sessionForm">
              <label htmlFor="SessionMemID">Candidate ID:</label>
              <div>
                <input
                  id="SessionMemID"
                  type="text"
                  value={memberID}
                  onChange={(e) => {
                    setMemberID(e.target.value);
                  }}
                  onFocus={() => setErrorMemID("")}
                  className={errorMemID ? "errAdminInput" : ""}
                />
                {errorMemID && <p className="errAdminMes">{errorMemID}</p>}
              </div>
              <p>Attendance:</p>
              <div className="adminSesBtn">
                <button
                  type="button"
                  onClick={() => setRecordEnter("yes")}
                  className={`${recordEnter === "yes" ? "projectSelect" : ""}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setRecordEnter("no")}
                  className={`${recordEnter === "no" ? "projectSelect" : ""}`}
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => setRecordEnter("excused")}
                  className={`${
                    recordEnter === "excused" ? "projectSelect" : ""
                  }`}
                >
                  Excused
                </button>
              </div>
            </div>
          )}
          <button type="submit" className="adminProjectBtn">
            Update Score
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSetScores;
