export const SkeletonLoader = ({ count = 10, type = 'grid' }) => {
    const skeletons = Array.from({ length: count });

    if (type === 'grid') {
        return (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {skeletons.map((_, index) => (
                    <li key={index} className="animate-pulse">
                        <div className="bg-[var(--color-secondary)] w-full aspect-[3/4] rounded-lg mb-2"></div>
                        <div className="h-4 bg-[var(--color-secondary)] rounded mb-2"></div>
                        <div className="flex gap-2">
                            <div className="h-3 bg-[var(--color-secondary)] rounded flex-1"></div>
                            <div className="h-3 bg-[var(--color-secondary)] rounded w-12"></div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    if (type === 'list') {
        return (
            <ul className="flex flex-col gap-2">
                {skeletons.map((_, index) => (
                    <li key={index} className="animate-pulse flex items-center gap-3 bg-[var(--color-secondary)] p-3 rounded">
                        <div className="w-12 h-16 bg-[var(--color-primary)] rounded flex-shrink-0"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-[var(--color-primary)] rounded mb-2 w-3/4"></div>
                            <div className="h-3 bg-[var(--color-primary)] rounded w-1/2"></div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return null;
};
