import logo from "../assets/EIIG_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UsersLanding.css";

function UsersLanding() {
  const [firstName, setFirstName] = useState("");
  const [numValue, setNumValue] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorId, setErrorId] = useState("");
  const [errorValid, setErrorValid] = useState("");
  const navigate = useNavigate();

  const validateInput = (nameValue, idValue) => {
    if (!/^[A-Za-z]+$/.test(nameValue)) {
      setErrorName("First name is invalid. Input can only take letters");
      return false;
    }

    if (!/^[0-9]+$/.test(idValue)) {
      setErrorId("ID is invalid. Input can only take numbers");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameValue = event.target.first_name.value;
    const idValue = event.target.id.value;
    if (validateInput(nameValue, idValue)) {
      try {
        const response = await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ nameValue, idValue }),
        });

        if (response.ok) {
          navigate("/checkGrade");
        } else if (response.status === 400 || 500) {
          setErrorValid("User not found. Either First Name or ID is incorrect");
          setNumValue("");
        }
      } catch (error) {
        alert(error);
        // popup
      }
    } else {
      alert("data was invalid");
    }
  };

  return (
    <>
      <div id="landingRoot">
        <div className="mainCard cabin-font">
          <img src={logo} alt="EIIG logo" />
          <h1>
            Early Analyst Experience <br /> Grading Report System
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid-inputs">
              <label htmlFor="fname" id="fname-label">
                First Name:
              </label>
              <div className="inputWrapper">
                <input
                  type="text"
                  id="fname"
                  className={`cabin-font ${errorName ? "error" : ""}`}
                  name="first_name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  onFocus={() => {
                    if (errorName) setErrorName("");
                  }}
                />
                {errorName && <p className="errorMessageUser">{errorName}</p>}
              </div>
              <label htmlFor="id" id="id-label">
                EIIG ID:
              </label>
              <div className="inputWrapper">
                <input
                  type="text"
                  id="id"
                  className={`cabin-font ${
                    errorId || errorValid ? "error" : ""
                  }`}
                  name="id"
                  value={numValue}
                  onChange={(e) => {
                    setNumValue(e.target.value);
                  }}
                  onFocus={() => {
                    if (errorId) setErrorId("");
                    if (errorValid) setErrorValid("");
                  }}
                />
                {errorId && <p className="errorMessageUser">{errorId}</p>}
                {errorValid && <p className="errorMessageUser">{errorValid}</p>}
              </div>
            </div>
            <p id="hintUser">
              If you don’t remember your EIIG ID, <br /> please contact
              Catherine via Slack
            </p>
            <input
              id="logIn"
              className="cabin-font"
              type="submit"
              value="Log In"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default UsersLanding;
