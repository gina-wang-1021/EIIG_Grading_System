import logo from "../assets/EIIG_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UsersLanding.css";

function UsersLanding() {
  const [firstName, setFirstName] = useState("");
  const [idValue, setIdValue] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorId, setErrorId] = useState("");
  const [errorValid, setErrorValid] = useState("");
  const navigate = useNavigate();

  let errorNameMes = "";
  let errorIdMes = "";

  const validateInput = (nameValue, idValue) => {
    if (!/^[A-Za-z]+$/.test(nameValue)) {
      console.log("setting error name");
      errorNameMes = "First name is invalid. Input can only take letters";
      setErrorName(errorNameMes);
    }

    if (!/^[0-9]+$/.test(idValue)) {
      console.log("setting error id");
      errorIdMes = "ID is invalid. Input can only take numbers";
      setErrorId(errorIdMes);
    }

    console.log(errorNameMes);
    console.log(errorIdMes);

    if (errorNameMes || errorIdMes) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameValue = event.target.first_name.value;
    const idValue = event.target.id.value;
    if (validateInput(nameValue, idValue)) {
      console.log("passed validation, submitting data");
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
          const data = await response.json();
          console.log(data);
          navigate("/checkGrade");
        } else if (response.status === 400) {
          console.log(await response.json());
          setErrorValid("User not found. Either First Name or ID is incorrect");
          setIdValue("");
        }
      } catch (error) {
        console.log(error);
        // create pop out with error message
      }
    } else {
      console.log("data was invalid");
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
                {errorName && <p className="errorMessage">{errorName}</p>}
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
                  value={idValue}
                  onChange={(e) => {
                    setIdValue(e.target.value);
                  }}
                  onFocus={() => {
                    if (errorId) setErrorId("");
                    if (errorValid) setErrorValid("");
                  }}
                />
                {errorId && <p className="errorMessage">{errorId}</p>}
                {errorValid && <p className="errorMessage">{errorValid}</p>}
              </div>
            </div>
            <p>
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
