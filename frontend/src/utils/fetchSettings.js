export default async function fetchSettings() {
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
}
