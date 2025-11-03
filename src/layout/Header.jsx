// index.js or main.jsx
import '../index.css';
import '../App.css'; // both are fine
import { NavLink } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

export const Header = () => {
    return <header className="bg-[var(--color-primary)] flex items-center justify-between">
        <NavLink to="/">
            <div className='flex p-4 mx-5'>
                <h1 className="text-3xl text-white/80">Nep</h1>
                <h1 className="text-3xl text-red-500">Anime</h1>
            </div>
        </NavLink>
        <div className='flex'>
            <div className='bg-[var(--color-secondary)] rounded-full mr-8 flex items-center '>
                <input type="text" placeholder="Search anime..." className="py-1 text-white/70 px-5 rounded-full focus:outline-none"/>
                 <BiSearch className="w-8 h-8 text-white/70 hover:text-white/100 hover:scale-110 text-xl pr-3 cursor-pointer"/>
            </div>
            <nav className="flex gap-8 items-center text-white/80 mr-5">
            <NavLink to="/" className="hover:text-red-500" end>Home</NavLink>
            <NavLink to="/movies" className="hover:text-red-500">Movies</NavLink>
            <NavLink to="/tv-series" className="hover:text-red-500">Tv series</NavLink>
            {/* <NavLink to="/topanimes" className="hover:text-red-500">Top animes</NavLink> */}
        </nav>
        </div>
    </header>
}