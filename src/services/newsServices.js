export async function getNewsData(feedSource, isCitySearch = false) {
  let rssUrl = feedSource;

  // Si c'est une recherche par ville, on utilise le flux RSS de recherche Google News
  if (isCitySearch) {
    rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(feedSource)}&hl=fr&gl=FR&ceid=FR:fr`;
  }

  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Erreur lors de la récupération des actualités");
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Erreur newsService:", error);
    return [];
  }
}