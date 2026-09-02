import React from 'react';

export const Gallery: React.FC = () => {
  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen pb-20">
      {/* Banner */}
      <section
        className="h-[45vh] min-h-[320px] flex flex-col justify-center items-center text-center text-white px-[5%] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.6)), url('/Gereja Rasuli Indonesia Jemaat Zion Filadelfia.png')`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider drop-shadow-md">
          Galeri & Dokumentasi
        </h1>
        <p className="mt-3 text-neutral-200 max-w-xl text-base drop-shadow">
          Momen-momen indah kebersamaan jemaat Gereja Rasuli Indonesia.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-[5%] mt-16 text-center">
        <h2 className="text-2xl font-bold text-neutral-400">Sedang Dalam Persiapan</h2>
        <p className="text-neutral-500 mt-2">Halaman galeri akan segera hadir.</p>
      </div>
    </div>
  );
};
