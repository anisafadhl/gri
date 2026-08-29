import React from 'react';

export const Campuses: React.FC = () => {
  const campuses = [
    {
      name: 'Jemaat Zion Filadelfia',
      badge: 'Main Campus',
      description:
        'Pusat peribadatan utama dengan jangkauan pelayanan yang komprehensif, pembinaan keluarga rohani, dan pusat Mezbah Doa Pagi.',
    },
    {
      name: 'Jemaat Agape',
      badge: 'Community & Outreach Campus',
      description:
        'Fokus pada perintisan misi sosial, pelayanan anak-anak, dan pemberdayaan masyarakat di wilayah perkotaan dan sekitarnya.',
    },
    {
      name: 'Jemaat Bethel',
      badge: 'Youth & College Campus',
      description:
        'Menjadi rumah ibadah yang ramah, hangat, dan dinamis bagi para mahasiswa, profesional muda, dan perantau.',
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
          Our Campuses
        </h1>
      </section>

      {/* Campuses Content */}
      <section className="py-24 px-[5%] max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-dark-900 mb-16 uppercase tracking-wide">
          Our Campuses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campuses.map((c, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-dark-900 mb-2">{c.name}</h3>
                <span className="inline-block text-gold font-semibold text-sm mb-4">
                  {c.badge}
                </span>
                <p className="text-neutral-600 text-sm leading-relaxed">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
