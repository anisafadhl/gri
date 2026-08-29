import React from 'react';

export const Services: React.FC = () => {
  const services = [
    {
      title: 'Ibadah Raya Minggu',
      time: 'Setiap Minggu • 09.00 & 17.00 WIB',
      description:
        'Ibadah umum untuk seluruh keluarga dengan puji-pujian yang dinamis dan pembawaan firman Tuhan yang menguatkan serta memperbaharui iman.',
    },
    {
      title: 'Ibadah Youth',
      time: 'Setiap Sabtu • 18.00 WIB',
      description:
        'Wadah bagi generasi muda untuk bertumbuh bersama, saling menguatkan, dan melayani dengan semangat yang relevan, penuh gairah, dan kreatif.',
    },
    {
      title: 'Sekolah Minggu (Kids)',
      time: 'Setiap Minggu • 09.00 WIB',
      description:
        'Mengenalkan kasih dan firman Kristus kepada anak-anak sejak usia dini melalui cerita Alkitab yang interaktif, puji-pujian ceria, dan kegiatan kreatif.',
    },
  ];

  return (
    <div className="w-full">
      {/* Banner */}
      <section
        className="h-[50vh] min-h-[350px] flex flex-col justify-center items-center text-center text-white px-[5%] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.5)), url('/Gereja Rasuli Indonesia Jemaat Zion Filadelfia.png')`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
          Worship Services
        </h1>
      </section>

      {/* Services Content */}
      <section className="py-24 px-[5%] max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-dark-900 mb-16 uppercase tracking-wide">
          Jadwal Ibadah Kami
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-dark-900 mb-2">{s.title}</h3>
                <span className="inline-block text-gold font-bold text-sm mb-4">
                  {s.time}
                </span>
                <p className="text-neutral-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
