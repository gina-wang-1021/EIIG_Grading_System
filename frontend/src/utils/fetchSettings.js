export default async function fetchSettings() {
  const backendUrl = process.env.BACKEND_URL;

  try {
    const settingsData = await fetch(`${backendUrl}/settings`, {
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
