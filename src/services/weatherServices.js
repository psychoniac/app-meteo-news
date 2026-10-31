export async function getWeatherData(latitude = 46.1603, longitude = -1.1511) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    if (!response.ok) throw new Error("Erreur lors de la récupération de la météo");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur weatherService:", error);
    return null;
  }
}