import React from 'react';
import { useHeroImage } from '../hooks/useHeroImage';

export const Mission: React.FC = () => {
  const heroImage = useHeroImage();
  const values = [
    {
      title: 'Doa & Penyembahan',
      description:
        'Mengutamakan hadirat Tuhan melalui doa yang tekun dan penyembahan yang berpusat pada Roh dan kebenaran.',
    },
    {
      title: 'Kebenaran Firman',
      description:
        'Berpegang teguh pada firman Tuhan yang murni dan berotoritas sebagai pedoman hidup sehari-hari.',
    },
    {
      title: 'Kasih & Persaudaraan',
      description:
        'Membangun keluarga rohani yang saling menopang, memulihkan, dan memberkati satu sama lain.',
    },
  ];

  return (
    <div className="w-full">
      {/* Banner */}
      <section
        className="h-[50vh] min-h-[350px] flex flex-col justify-center items-center text-center text-white px-[5%] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(46, 27, 10, 0.65) 0%, rgba(46, 27, 10, 0.85) 100%), url('${heroImage}')`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
          Our Mission
        </h1>
      </section>

      {/* Content */}
      <section className="py-24 px-[5%] max-w-5xl mx-auto text-center">
        <p className="font-serif italic text-xl md:text-3xl text-neutral-800 leading-relaxed max-w-4xl mx-auto mb-20">
          "Membawa kasih karunia dan kebenaran Kristus ke setiap bangsa, memuridkan jiwa-jiwa, dan membangun komunitas yang saling mengasihi serta berdampak nyata bagi dunia."
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-12 uppercase tracking-wide">
          Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-lg border-l-4 border-gold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-dark-900 mb-3">{v.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
