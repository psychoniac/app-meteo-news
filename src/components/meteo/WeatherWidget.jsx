import { useState, useEffect } from 'react';
import { getWeatherData } from '../../services/weatherServices';
import CitySearch from './CitySearch';
import WeatherForecast from './WeatherForecast';

export default function WeatherWidget({ location, onSelectCity }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getWeatherData(location.latitude, location.longitude).then((data) => {
            setWeather(data);
            setLoading(false);
        });
    }, [location]);

    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-lg font-semibold opacity-90">Météo Actuelle</h2>
                        <p className="text-sm font-medium">{location.name}, {location.country}</p>
                    </div>
                </div>

                <CitySearch onSelectCity={onSelectCity} />
            </div>

            {loading ? (
                <div className="py-8 text-center animate-pulse opacity-80">Chargement de la météo...</div>
            ) : weather && weather.current ? (
                <div className="my-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">{weather.current.temperature_2m}</span>
                        <span className="text-2xl">{weather.current_units.temperature_2m}</span>
                    </div>
                    <div className="text-sm space-y-1 opacity-90 mt-4 pt-4 border-t border-white/20">
                        <p>Humidité : {weather.current.relative_humidity_2m}%</p>
                        <p>Vent : {weather.current.wind_speed_10m} km/h</p>
                    </div>

                    <WeatherForecast daily={weather.daily} />
                </div>
            ) : (
                <div className="p-4 bg-red-500/50 rounded-xl text-sm">Impossible de charger la météo.</div>
            )}
        </div>
    );
}