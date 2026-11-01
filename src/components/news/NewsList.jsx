import { useState, useEffect } from 'react';
import { getNewsData } from '../../services/newsServices';
import NewsCard from './NewsCard';

const FEED_OPTIONS = [
    { label: 'France Info (Général)', url: 'https://www.franceinfo.fr/titres.rss', type: 'national' },
    { label: 'Le Monde (Actualités)', url: 'https://www.lemonde.fr/rss/une.xml', type: 'national' },
    { label: '20 Minutes', url: 'https://www.20minutes.fr/rss/une.xml', type: 'national' }
];

export default function NewsList({ cityName }) {
    // Mode d'affichage par défaut : basé sur la ville sélectionnée
    const [mode, setMode] = useState('city'); // 'city' ou 'national'
    const [selectedFeed, setSelectedFeed] = useState(FEED_OPTIONS[0].url);

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Dès que la ville change ou que le mode change, on recharge les actus
    useEffect(() => {
        setLoading(true);
        if (mode === 'city' && cityName) {
            getNewsData(cityName, true).then((items) => {
                setArticles(items);
                setLoading(false);
            });
        } else {
            getNewsData(selectedFeed, false).then((items) => {
                setArticles(items);
                setLoading(false);
            });
        }
    }, [cityName, mode, selectedFeed]);

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        {mode === 'city' ? `📰 Actualités : ${cityName}` : '📰 Actualités Nationales'}
                    </h2>
                    <p className="text-xs text-slate-400">
                        {mode === 'city' ? 'Flux localisé en temps réel' : 'Sélection de grands médias'}
                    </p>
                </div>

                {/* Boutons pour basculer entre Actus Locales (Ville) et Nationales */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setMode('city')}
                        className={`text-xs font-medium px-3 py-2 rounded-xl transition-colors ${mode === 'city'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        📍 {cityName}
                    </button>

                    <button
                        type="button"
                        onClick={() => setMode('national')}
                        className={`text-xs font-medium px-3 py-2 rounded-xl transition-colors ${mode === 'national'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        France
                    </button>

                    {/* Sélecteur de flux si on est en mode national */}
                    {mode === 'national' && (
                        <select
                            value={selectedFeed}
                            onChange={(e) => setSelectedFeed(e.target.value)}
                            className="text-xs bg-slate-100 text-slate-700 font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                        >
                            {FEED_OPTIONS.map((feed) => (
                                <option key={feed.url} value={feed.url}>
                                    {feed.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            {/* Barre de recherche locale */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrer les articles affichés..."
                    className="w-full px-4 py-2 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Affichage des actus */}
            {loading ? (
                <div className="py-12 text-center text-slate-400 animate-pulse">Chargement des actualités...</div>
            ) : filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[600px] pr-1">
                    {filteredArticles.map((article, index) => (
                        <NewsCard key={index} article={article} />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-slate-400 text-sm">
                    Aucun article trouvé pour cette recherche.
                </div>
            )}
        </div>
    );
}