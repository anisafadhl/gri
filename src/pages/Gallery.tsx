import React from 'react';
import { useHeroImage } from '../hooks/useHeroImage';

export const Gallery: React.FC = () => {
  const heroImage = useHeroImage();
  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen pb-20">
      {/* Banner */}
      <section
        className="h-[45vh] min-h-[320px] flex flex-col justify-center items-center text-center text-white px-[5%] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(46, 27, 10, 0.65) 0%, rgba(46, 27, 10, 0.85) 100%), url('${heroImage}')`,
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
