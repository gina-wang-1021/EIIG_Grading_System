export default async function fetchScoreData() {
  const backendUrl = process.env.BACKEND_URL;

  try {
    const dataResponse = await fetch(`${backendUrl}/grades`, {
      method: "GET",
      credentials: "include",
    });
    if (dataResponse.status === 400) {
      // popup
      alert("User not logged in");
      return;
    }
    if (dataResponse.status === 500) {
      // popup
      alert("server error:", dataResponse);
      return;
    }
    const data = await dataResponse.json();
    return JSON.parse(data);
  } catch (err) {
    // popup
    alert("Something went wrong: ", err);
    return;
  }
}
