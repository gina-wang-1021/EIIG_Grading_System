export default async function fetchScoreData() {
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
}
