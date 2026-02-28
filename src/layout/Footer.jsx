import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[var(--color-primary)] text-white/80 flex flex-col items-center text-center p-4">
      <NavLink to="/">
            <div className='flex p-2 md:p-4 mx-5 justify-center'>
                <h1 className="text-2xl md:text-3xl text-white/80">Nep</h1>
                <h1 className="text-2xl md:text-3xl text-red-500">Anime</h1>
            </div>
        </NavLink>
      <p className="max-w-3xl px-2">
        NepAnime does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
      </p>
      <p className="mt-2">
        © NepAnime. All rights reserved.
      </p>

    </footer>
  );
}
