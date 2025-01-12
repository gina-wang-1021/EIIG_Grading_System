export default async function fetchSettings() {
  try {
    const settingsData = await fetch("http://localhost:3000/settings", {
      method: "GET",
      credentials: "include",
    });
    if (settingsData.status !== 200) {
      alert("server error: ", settingsData);
      return;
    }
    const settings = await settingsData.json();
    return JSON.parse(settings);
  } catch (err) {
    // popup
    alert("Something went wrong fetching settings:", err);
    return;
  }
}
