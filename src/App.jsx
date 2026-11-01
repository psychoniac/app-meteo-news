import Header from './components/layout/Header';
import WeatherWidget from './components/meteo/WeatherWidget';
import NewsList from './components/news/NewsList';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <WeatherWidget />
        </div>
        <div className="md:col-span-2">
          <NewsList />
        </div>
      </main>
    </div>
  );
}