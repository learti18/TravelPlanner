// HeroSection.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const HeroSection = () => (
  <div className="bg-[url('/images/background.jpg')] min-h-screen bg-cover bg-center bg-blend-darken bg-black bg-opacity-40 relative isolate px-6 pt-14 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
    </div>
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-balance text-5xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
          Plan your next travel
        </h1>
        <p className="mt-8 text-pretty text-lg font-medium text-white sm:text-md md:text-xl">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
          fugiat veniam occaecat.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NavLink 
            to="/list-destinations"
            className="rounded-md bg- px-3.5 py-2.5 bg-sky-700 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Trip
          </NavLink>
          <a href="#" className="text-sm/6 font-semibold text-white">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
