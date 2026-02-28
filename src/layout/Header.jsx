// index.js or main.jsx
import React, { useState } from 'react';
import '../index.css';
import '../App.css'; // both are fine
import { NavLink } from 'react-router-dom';
import { BiSearch, BiMenu, BiX } from 'react-icons/bi';

export const Header = () => {
    const [open, setOpen] = useState(false);
    return <header className="bg-[var(--color-primary)] flex flex-wrap items-center justify-between px-3 py-2">
        <div className="flex items-center">
        <NavLink to="/">
            <div className='flex p-2 md:p-4 mx-2 md:mx-5 items-center'>
                <h1 className="text-2xl md:text-3xl text-white/80">Nep</h1>
                <h1 className="text-2xl md:text-3xl text-red-500">Anime</h1>
            </div>
        </NavLink>
        </div>
        <div className='flex items-center'>
            <div className='hidden md:flex bg-[var(--color-secondary)] rounded-full mr-4 md:mr-8 flex items-center '>
                <input type="text" placeholder="Search anime..." className="py-1 text-white/70 px-4 md:px-5 rounded-full focus:outline-none"/>
                 <BiSearch className="w-8 h-8 text-white/70 hover:text-white/100 hover:scale-110 text-xl pr-3 cursor-pointer"/>
            </div>
            <button className="md:hidden text-white/80 mr-3" onClick={() => setOpen(!open)}>
              {open ? <BiX className="w-6 h-6"/> : <BiMenu className="w-6 h-6"/>}
            </button>
            <nav className="hidden md:flex gap-6 items-center text-white/80 mr-2">
              <NavLink to="/" className="hover:text-red-500" end>Home</NavLink>
              <NavLink to="/movies" className="hover:text-red-500">Movies</NavLink>
              <NavLink to="/tv-series" className="hover:text-red-500">Tv series</NavLink>
            </nav>
        </div>
        {open && (
          <nav className="w-full md:hidden flex flex-col gap-2 px-4 pb-3 bg-[var(--color-primary)]">
            <NavLink to="/" className="text-white/80 py-2" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/movies" className="text-white/80 py-2" onClick={() => setOpen(false)}>Movies</NavLink>
            <NavLink to="/tv-series" className="text-white/80 py-2" onClick={() => setOpen(false)}>Tv series</NavLink>
          </nav>
        )}
    </header>
}