import { useState, useEffect } from 'react';
import { getNewsData } from '../../services/newsServices';
import NewsCard from './NewsCard';

// Liste de quelques flux RSS gratuits disponibles
const FEED_OPTIONS = [
    { label: 'France Info (Général)', url: 'https://www.franceinfo.fr/titres.rss' },
    { label: 'Le Monde (Actualités)', url: 'https://www.lemonde.fr/rss/une.xml' },
    { label: '20 Minutes', url: 'https://www.20minutes.fr/rss/une.xml' }
];

export default function NewsList() {
    const [selectedFeed, setSelectedFeed] = useState(FEED_OPTIONS[0].url);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        getNewsData(selectedFeed).then((items) => {
            setArticles(items);
            setLoading(false);
        });
    }, [selectedFeed]);

    // Filtrage des articles selon la barre de recherche locale
    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">Dernières Actualités</h2>

                {/* Sélecteur de flux RSS */}
                <select
                    value={selectedFeed}
                    onChange={(e) => setSelectedFeed(e.target.value)}
                    className="text-xs bg-slate-100 text-slate-700 font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {FEED_OPTIONS.map((feed) => (
                        <option key={feed.url} value={feed.url}>
                            {feed.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Barre de recherche dans les actus */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrer les articles par mots-clés..."
                    className="w-full px-4 py-2 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Affichage du contenu */}
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
                    Aucun article ne correspond à votre recherche.
                </div>
            )}
        </div>
    );
}