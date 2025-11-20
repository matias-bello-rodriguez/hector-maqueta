import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nativa Eventos</h1>
          <p className="text-xl md:text-2xl font-light mb-2">Proyecto de Título Profesional</p>
          <div className="text-sm md:text-base opacity-90">
            <p>Administración Gastronómica - GAIT02</p>
            <p className="mt-1">Francisca Sepúlveda • Héctor Silva</p>
            <p className="mt-1">Octubre 2025</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
