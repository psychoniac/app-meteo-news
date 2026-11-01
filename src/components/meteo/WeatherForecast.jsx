export default function WeatherForecast({ daily }) {
    if (!daily || !daily.time) return null;

    // On prend les 3 prochains jours (indices 1, 2, 3 ou 0, 1, 2 selon ce que tu préfères. Prenons les 3 premiers jours disponibles)
    const forecastDays = daily.time.slice(0, 3).map((time, index) => {
        const date = new Date(time);
        const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });

        return {
            date: dayName,
            max: Math.round(daily.temperature_2m_max[index]),
            min: Math.round(daily.temperature_2m_min[index]),
            code: daily.weather_code[index],
        };
    });

    return (
        <div className="mt-4 pt-4 border-t border-white/20">
            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-3">
                Prévisions à 3 jours
            </h3>
            <div className="grid grid-cols-3 gap-2">
                {forecastDays.map((day, idx) => (
                    <div key={idx} className="bg-white/10 p-2.5 rounded-xl text-center flex flex-col justify-between">
                        <span className="text-xs font-medium capitalize opacity-90">{day.date}</span>
                        <div className="my-1 text-sm font-bold">
                            <span>{day.max}°</span>
                            <span className="text-xs opacity-75 font-normal ml-1">{day.min}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}