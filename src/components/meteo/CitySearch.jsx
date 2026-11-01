import { useState } from 'react';
import { searchCity } from '../../services/weatherServices';

export default function CitySearch({ onSelectCity }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        const cities = await searchCity(query);
        setResults(cities);
        setIsSearching(false);
    };

    const handleSelect = (city) => {
        onSelectCity(city);
        setResults([]);
        setQuery('');
    };

    return (
        <div className="relative mb-4">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher une ville (ex: Paris, Nantes...)"
                    className="flex-1 px-4 py-2 text-sm bg-white/20 placeholder-white/70 text-white rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
                >
                    {isSearching ? '...' : 'Chercher'}
                </button>
            </form>

            {/* Liste des résultats de la recherche */}
            {results.length > 0 && (
                <ul className="absolute z-10 left-0 right-0 mt-2 bg-white text-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-100 max-h-60 overflow-y-auto">
                    {results.map((city) => (
                        <li key={city.id}>
                            <button
                                type="button"
                                onClick={() => handleSelect(city)}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 flex justify-between items-center"
                            >
                                <span className="font-medium">{city.name}</span>
                                <span className="text-xs text-slate-400">
                                    {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}