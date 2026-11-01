import { useState, useEffect } from 'react';
import { getMarineData } from '../../services/weatherServices';

export default function MarineWidget({ latitude, longitude }) {
    const [marine, setMarine] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        getMarineData(latitude, longitude).then((data) => {
            if (!isCancelled) {
                setMarine(data);
            }
        });

        return () => {
            isCancelled = true; // Évite les mises à jour d'état si le composant est démonté
        };
    }, [latitude, longitude]);

    // Si les données ne sont pas encore là, on affiche l'animation de chargement
    if (!marine || !marine.current) {
        return (
            <div className="bg-teal-600 text-white p-6 rounded-2xl shadow-lg animate-pulse flex items-center justify-center h-48">
                Chargement des données marines...
            </div>
        );
    }

    const current = marine.current;

    return (
        <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold opacity-90 mb-1">🌊 Conditions Marines</h2>
                <p className="text-xs opacity-75">Hauteur & Période des vagues</p>
            </div>

            <div className="my-4 grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-xs opacity-80 block mb-1">Hauteur vagues</span>
                    <span className="text-2xl font-bold">
                        {current.wave_height !== undefined ? `${current.wave_height} m` : 'N/A'}
                    </span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                    <span className="text-xs opacity-80 block mb-1">Période</span>
                    <span className="text-2xl font-bold">
                        {current.wave_period !== undefined ? `${current.wave_period}s` : 'N/A'}
                    </span>
                </div>
            </div>

            <div className="text-xs opacity-80 pt-2 border-t border-white/20 flex justify-between">
                <span>Direction des vagues</span>
                <span>{current.wave_direction !== undefined ? `${current.wave_direction}°` : '-'}</span>
            </div>
        </div>
    );
}