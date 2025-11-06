export const Loading = () => {
    return (<div className="w-full h-screen flex items-center justify-center">
            {/* <div className="loader"></div> */}
        <div className="  overflow-hidden flex flex-col items-center justify-center bg-transparent ">
            <img
                src="https://media.tenor.com/bDgdFlOwH0AAAAAj/fire-emblem-maid-fire-emblem.gif"
                alt="Fire Emblem Maid"
                className="w-full h-full object-cover"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Loading...</p>

        </div>
        
        </div>)
}