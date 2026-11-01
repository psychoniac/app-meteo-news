export default function NewsCard({ article }) {
    // Formatage propre de la date
    const formattedDate = new Date(article.pubDate).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <article className="bg-slate-50 hover:bg-white p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all shadow-sm hover:shadow flex flex-col justify-between">
            <div>
                {article.categories && article.categories.length > 0 && (
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md mb-2">
                        {article.categories[0]}
                    </span>
                )}
                <h3 className="font-semibold text-slate-900 leading-snug mb-2 line-clamp-2">
                    <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors focus:outline-none focus:underline"
                    >
                        {article.title}
                    </a>
                </h3>
                {article.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                        {/* Nettoyage basique des balises HTML si le RSS en contient */}
                        {article.description.replace(/<[^>]*>?/gm, '')}
                    </p>
                )}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-200/60 mt-auto">
                <span>{article.author || 'Rédaction'}</span>
                <span>{formattedDate}</span>
            </div>
        </article>
    );
}