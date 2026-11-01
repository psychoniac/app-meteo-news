import { useState, useEffect } from 'react';
import { getCountryWeather } from '../../services/weatherServices';

export default function CountryMapWidget({ onSelectCity }) {
    const [citiesWeather, setCitiesWeather] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCountryWeather().then((data) => {
            setCitiesWeather(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg flex flex-col h-full">
            <div className="mb-4">
                <h2 className="text-lg font-semibold opacity-90">🗺️ Carte Météo de la France</h2>
                <p className="text-xs opacity-60">Cliquez sur une ville pour l'afficher en détail</p>
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center py-16 text-slate-400 animate-pulse text-sm">
                    Chargement de la carte météo...
                </div>
            ) : (
                <div className="relative flex-1 bg-slate-950/40 rounded-xl border border-white/10 min-h-[320px] overflow-hidden flex items-center justify-center">

                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none text-8xl font-black tracking-widest uppercase">
                        France
                    </div>

                    {citiesWeather.map((city, idx) => (
                        <div
                            key={idx}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                            style={{ top: city.top, left: city.left }}
                        >
                            {/* Ajout du onClick sur le bouton de la ville */}
                            <button
                                type="button"
                                onClick={() => onSelectCity(city)}
                                className="bg-blue-600/90 hover:bg-blue-500 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-lg border border-white/20 transition-transform hover:scale-110 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>{city.name}</span>
                                <span className="bg-black/20 px-1.5 py-0.5 rounded-lg ml-0.5">
                                    {city.temp}{city.unit}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}