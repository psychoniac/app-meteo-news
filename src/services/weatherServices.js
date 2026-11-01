// Recherche une ville et retourne ses coordonnées (latitude, longitude, nom, pays)
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

// Récupère la météo pour des coordonnées données
export async function getWeatherData(latitude = 46.1603, longitude = -1.1511) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
    );
    if (!response.ok) throw new Error("Erreur lors de la récupération de la météo");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur weatherService:", error);
    return null;
  }
}