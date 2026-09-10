import React from 'react';
import { useHeroImage } from '../hooks/useHeroImage';
import { Clock } from 'lucide-react';

export const Yayasan: React.FC = () => {
  const heroImage = useHeroImage();

  return (
    <div className="w-full font-sans antialiased text-[#171717] bg-[#FBF9F5] min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section
        className="relative h-[40vh] min-h-[300px] flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(46, 27, 10, 0.75) 0%, rgba(46, 27, 10, 0.9) 100%), url('${heroImage}')`,
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 pt-12">
          <div className="h-16 sm:h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center mb-6 px-6 py-3 w-max mx-auto shadow-lg">
            <img src="/Logo Yayasan-Main.png" alt="Logo Yayasan" className="h-full w-auto object-contain filter brightness-0 invert" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white drop-shadow-xl">
            Yayasan RPP
          </h1>
        </div>
      </section>

      {/* Coming Soon Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-stone-200 text-center max-w-lg mx-auto transform transition-all hover:shadow-md">
          <div className="w-20 h-20 bg-[#FDFBF7] rounded-full border border-[#8E7015]/30 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-[#8E7015]" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#171717] tracking-tight mb-4">Coming Soon</h2>
          <p className="text-stone-500 leading-relaxed text-sm sm:text-base">
            Halaman Yayasan Rumah Pemulihan & Pengajaran (RPP) sedang dalam tahap pengembangan. Nantikan informasi lengkap mengenai program sosial dan pelayanan kami di sini.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Yayasan;
