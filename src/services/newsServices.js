export async function getNewsData(rssUrl = "https://www.franceinfo.fr/titres.rss") {
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