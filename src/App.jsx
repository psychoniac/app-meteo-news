import Header from './components/layout/Header';
import WeatherWidget from './components/meteo/WeatherWidget';
import MarineWidget from './components/meteo/MarineWidget';
import NewsList from './components/news/NewsList';

export default function App() {
  // Optionnel : si tu veux partager la position globale, tu pourrais remonter le state ici, 
  // mais pour l'instant le widget météo gère sa ville. On peut fixer des coordonnées par défaut ou les synchroniser.

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <WeatherWidget />
          {/* Exemple pour La Rochelle par défaut */}
          <MarineWidget latitude={46.1603} longitude={-1.1511} />
        </div>
        <div className="md:col-span-2">
          <NewsList />
        </div>
      </main>
    </div>
  );
}