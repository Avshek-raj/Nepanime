export const Trending = ({trendingAnime}) => {
    return (
        <>
            <ul>    
                {trendingAnime.map((anime) => (
                    <li key={anime.id} className="mb-4 flex bg-[var(--color-primary)] p-3 rounded-lg hover:bg-[var(--color-secondary)] transition-colors duration-300">
                        <img src={anime.poster} alt={anime.title} className="w-16 h-22 object-cover rounded-md mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold text-white/80">{anime.title.length > 30 ? anime.title.substring(0, 30) + "..." : anime.title}</h2>
                            <p className="text-sm text-white/70">Type: {anime.type}</p>
                            <p className="text-sm text-white/70">Episodes: {anime.episodes.total}</p>
                            <p className="text-sm text-white/70">Aired: {anime.aired}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}