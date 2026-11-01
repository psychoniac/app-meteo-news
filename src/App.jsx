import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import WeatherWidget from './components/meteo/WeatherWidget';
import MarineWidget from './components/meteo/MarineWidget';
import CountryMapWidget from './components/meteo/CountryMapWidget';
import NewsList from './components/news/NewsList';
import Footer from './components/layout/Footer';

const STORAGE_KEY = 'weather_app_selected_city';
const DEFAULT_CITY = {
  name: 'La Rochelle',
  country: 'France',
  latitude: 46.1603,
  longitude: -1.1511
};

export default function App() {
  // L'état global de la ville sélectionnée
  const [location, setLocation] = useState(() => {
    const savedCity = localStorage.getItem(STORAGE_KEY);
    if (savedCity) {
      try {
        return JSON.parse(savedCity);
      } catch (e) {
        console.error("Erreur parsing localStorage:", e);
      }
    }
    return DEFAULT_CITY;
  });

  // Sauvegarde dans le localStorage dès que la ville change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  }, [location]);

  // Fonction unifiée pour changer de ville
  const handleSelectCity = (city) => {
    setLocation({
      name: city.name,
      country: city.country || 'France',
      latitude: city.lat !== undefined ? city.lat : city.latitude,
      longitude: city.lon !== undefined ? city.lon : city.longitude
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Colonne de gauche : Widgets météo & marine pilotés par l'état global */}
        <div className="md:col-span-1 space-y-6">
          <WeatherWidget location={location} onSelectCity={handleSelectCity} />
          <MarineWidget latitude={location.latitude} longitude={location.longitude} />
        </div>

        {/* Colonne de droite : Carte interactive et Actus */}
        <div className="md:col-span-2 space-y-6 flex flex-col">
          <CountryMapWidget onSelectCity={handleSelectCity} />
          <NewsList cityName={location.name} />
        </div>

      </main>
      <Footer />
    </div>
  );
}