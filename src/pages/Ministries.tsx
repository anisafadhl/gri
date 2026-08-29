import React from 'react';

export const Ministries: React.FC = () => {
  const ministries = [
    {
      title: "Men's Ministry",
      description:
        'Membangun para pria dan kepala keluarga agar menjadi pemimpin yang berintegritas, beriman teguh, serta menjadi teladan di dalam keluarga, gereja, dan dunia kerja.',
    },
    {
      title: "Women's Ministry",
      description:
        'Komunitas wanita yang saling menguatkan, berdoa, dan bertumbuh bersama dalam keanggunan, hikmat Tuhan, dan peranan penting dalam membangun generasi ilahi.',
    },
    {
      title: 'Social Outreach',
      description:
        'Pelayanan kasih yang bergerak proaktif dan berbelas kasih di bidang kemanusiaan, membawa dampak nyata serta pengharapan bagi mereka yang membutuhkan di sekitar kita.',
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
          Our Ministries
        </h1>
      </section>

      {/* Ministries Content */}
      <section className="py-24 px-[5%] max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-dark-900 mb-16 uppercase tracking-wide">
          Wadah Pelayanan & Komunitas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ministries.map((m, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-dark-900 mb-4 pb-2 border-b-2 border-gold inline-block self-start">
                {m.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
