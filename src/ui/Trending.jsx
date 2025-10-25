export const Trending = ({ trendingAnime }) => {
  return (
    <div className="mr-5 overflow-x-auto py-4 scrollbar-hidden">
    {/* scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 transition-all duration-300"> */}
      <ul className="flex space-x-4 px-4">
        {trendingAnime.map((anime) => (
          <li
            key={anime.id}
            className="min-w-[220px] bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] transition-colors duration-300 shadow-md"
          >
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-full h-60 object-cover rounded-t-lg"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold text-white/90">
                {anime.title.length > 30
                  ? anime.title.substring(0, 30) + "..."
                  : anime.title}
              </h2>
              <p className="text-sm text-white/70">Type: {anime.type}</p>
              <p className="text-sm text-white/70">Aired: {anime.aired}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
