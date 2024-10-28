import logo from "../assets/EIIG_logo.png";

function UsersLanding() {
  function handleSubmit(event) {
    //validation
    return;
  }

  return (
    <>
      <div>
        <img src={logo} alt="EIIG logo" />
        <h1>Early Analyst Experience Grading Report System</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">First Name</label>
          <input type="text" id="fname" name="first_name" />
          <label htmlFor="id">EIIG ID</label>
          <input type="text" id="id" name="id" />
          <text>
            If you don’t remember your EIIG ID, please contact Catherine via
            Slack
          </text>
          <input type="submit" value={"Log In"} />
        </form>
      </div>
    </>
  );
}

export default UsersLanding;
