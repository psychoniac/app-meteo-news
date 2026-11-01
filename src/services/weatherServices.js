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

// Liste de grandes villes françaises avec leurs coordonnées et positions sur une carte SVG (en %)
export const CITIES_MAP = [
  { name: 'Lille', lat: 50.6292, lon: 3.0573, top: '15%', left: '55%' },
  { name: 'Paris', lat: 48.8566, lon: 2.3522, top: '32%', left: '50%' },
  { name: 'Strasbourg', lat: 48.5734, lon: 7.7521, top: '35%', left: '80%' },
  { name: 'Nantes', lat: 47.2184, lon: -1.5536, top: '42%', left: '20%' },
  { name: 'Lyon', lat: 45.7640, lon: 4.8357, top: '60%', left: '68%' },
  { name: 'Bordeaux', lat: 44.8378, lon: -0.5792, top: '68%', left: '28%' },
  { name: 'Marseille', lat: 43.2965, lon: 5.3698, top: '82%', left: '72%' },
];

export async function getCountryWeather() {
  // On extrait les latitudes et longitudes sous forme de chaînes séparées par des virgules
  const lats = CITIES_MAP.map(c => c.lat).join(',');
  const lons = CITIES_MAP.map(c => c.lon).join(',');

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m,weather_code&timezone=auto`
    );
    if (!response.ok) throw new Error("Erreur météo pays");
    const data = await response.json();
    
    // Open-Meteo renvoie un tableau si on passe plusieurs coordonnées
    const results = Array.isArray(data) ? data : [data];

    return CITIES_MAP.map((city, index) => ({
      ...city,
      temp: results[index]?.current?.temperature_2m ?? '--',
      unit: results[index]?.current_units?.temperature_2m ?? '°C'
    }));
  } catch (error) {
    console.error("Erreur getCountryWeather:", error);
    return [];
  }
}