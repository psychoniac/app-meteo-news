export async function searchCity(cityName) {
  if (!cityName.trim()) return [];
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=5&language=fr&format=json`
    );
    if (!response.ok) throw new Error("Erreur lors de la recherche de la ville");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Erreur searchCity:", error);
    return [];
  }
}

export async function getMarineData(latitude = 46.1603, longitude = -1.1511) {
  try {
    const response = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&current=wave_height,wave_direction,wave_period&timezone=auto`
    );
    if (!response.ok) throw new Error("Erreur lors de la récupération de la météo marine");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur marineService:", error);
    return null;
  }
}

// Ajout des paramètres daily dans l'URL Open-Meteo
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