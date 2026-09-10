import codecs

content = """import React from 'react';
import { Link } from 'react-router-dom';
import { useHeroImage } from '../hooks/useHeroImage';
import { ArrowDown, Radio } from 'lucide-react';

export const Services: React.FC = () => {
  const heroImage = useHeroImage();

  const BRANCH_SCHEDULES = [
    {
      id: 'jakarta',
      city: 'JAKARTA BARAT',
      name: 'ZFM Jakarta',
      services: [
        { name: 'Sunday Service', time: 'Minggu • Pk 07.00 WIB' },
        { name: 'Praise Worship & Bible Study', time: 'Rabu • Pk 19.00 WIB' },
        { name: 'Mezbah Dupa', time: 'Jumat • Pk 19.00 WIB' },
      ],
      extra: {
        name: 'Youth Service',
        timeBadge: 'Sabtu Pk 17.00 WIB',
        cpName: 'CP: Sdri. Nawang',
        cpAction: 'Hubungi CP',
        cpLink: 'https://wa.me/6287880268021'
      }
    },
    {
      id: 'bekasi',
      city: 'KOTA BEKASI',
      name: 'ZFM Bekasi',
      services: [
        { name: 'Sunday Service', time: 'Minggu • Pk 11.00 WIB' },
        { name: 'Praise Worship & Bible Study', time: 'Rabu • Pk 19.00 WIB' },
        { name: 'Mezbah Dupa', time: 'Jumat • Pk 19.00 WIB' },
      ]
    },
    {
      id: 'bandung',
      city: 'BANDUNG BARAT',
      name: 'ZFM Bandung',
      services: [
        { name: 'Sunday Service', time: 'Minggu • Pk 17.00 WIB' },
        { name: 'Praise Worship & Bible Study', time: 'Senin • Pk 19.00 WIB' },
        { name: 'Mezbah Dupa', time: 'Jumat • Pk 19.00 WIB' },
      ]
    },
    {
      id: 'toraja',
      city: 'TORAJA UTARA',
      name: 'ZFM Toraja',
      services: [
        { name: 'Sunday Service', time: 'Minggu • Pk 08.00 WITA' },
        { 
          name: 'Praise Worship & Bible Study', 
          time: '', 
          isLive: true 
        },
        { name: 'Mezbah Dupa', time: 'Jumat • Pk 18.00 WITA' },
      ]
    }
  ];

  return (
    <div className="w-full font-sans antialiased text-[#171717] bg-[#FBF9F5]">
      {/* 1. Hero Banner */}
      <section
        className="relative h-[48vh] min-h-[350px] flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(46, 27, 10, 0.65) 0%, rgba(46, 27, 10, 0.85) 100%), url('${heroImage}')`,
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-4 pt-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#C5A038] border border-white/15 tracking-widest uppercase">
            Jadwal & Pelayanan Rohani
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white drop-shadow-xl">
            Worship Services
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-stone-200 font-light leading-relaxed drop-shadow">
            "Sebab di mana dua atau tiga orang berkumpul dalam Nama-Ku, di situ Aku ada di tengah-tengah mereka." — Matius 18:20
          </p>
        </div>
      </section>

      {/* 2. Main Content Section */}
      <main className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8 mb-10">
          <div className="flex-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#8E7015] uppercase tracking-wider block mb-2">
              Jadwal Persekutuan
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#171717] tracking-tight uppercase">
              Jadwal Ibadah Resmi Cabang
            </h2>
          </div>
          <div className="md:max-w-md text-stone-500 text-xs sm:text-sm leading-relaxed text-left md:text-right">
            Seluruh susunan jadwal ibadah raya mingguan, pendalaman firman (PWBS), dan mezbah dupa di setiap kota.
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {BRANCH_SCHEDULES.map((branch) => (
            <div key={branch.id} className="bg-white rounded-[24px] overflow-hidden flex flex-col relative shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-lg transition-shadow border border-stone-100 group/card">
              {/* Top Gold Border */}
              <div className="h-2 w-full bg-gradient-to-r from-[#A98721] to-[#8E7015]" />
              
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                {/* Card Header */}
                <div className="mb-7">
                  <span className="text-[10px] font-bold text-[#8E7015] uppercase tracking-wider block mb-1.5">
                    CABANG • {branch.city}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#171717] tracking-tight">{branch.name}</h3>
                </div>
                
                {/* Services List */}
                <div className="space-y-6 flex-1">
                  {branch.services.map((svc, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8E7015] shrink-0" />
                        <span className="text-sm font-bold text-[#171717]">{svc.name}</span>
                      </div>
                      
                      {svc.time && (
                        <div className="pl-4 mt-1.5 text-[13px] text-stone-600 font-medium">
                          {svc.time}
                        </div>
                      )}
                      
                      {svc.isLive && (
                        <div className="pl-4 mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <span className="flex items-center gap-1.5 text-[12px] font-bold text-red-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                            Live Sekarang
                          </span>
                          <a href="https://youtube.com/@bjrbesronjusuproni" target="_blank" rel="noopener noreferrer" className="inline-flex self-start sm:self-auto bg-[#D32F2F] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg items-center gap-1 hover:bg-[#B71C1C] transition-colors shadow-sm no-underline">
                            Tonton Live →
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Extra Info / Youth Badges */}
                  {branch.extra && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A98721] shrink-0" />
                        <span className="text-sm font-bold text-[#171717]">{branch.extra.name}</span>
                        <span className="ml-auto bg-[#FBF9F5] text-[#8E7015] font-bold text-[10px] px-2.5 py-1 rounded-md border border-stone-200">
                          {branch.extra.timeBadge}
                        </span>
                      </div>
                      {/* CP Box */}
                      <div className="flex items-center justify-between pl-4 pt-1">
                        <span className="text-[12px] text-stone-500 font-medium">{branch.extra.cpName}</span>
                        <a href={branch.extra.cpLink} target="_blank" rel="noopener noreferrer" className="bg-[#8E7015] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-[#7A5F0F] transition-colors shadow-sm no-underline">
                          {branch.extra.cpAction}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Bottom CTA */}
                <Link to="/campuses" className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between text-[13px] font-bold text-[#171717] group-hover/card:text-[#8E7015] transition-colors no-underline">
                  <span>Lihat Komunitas CIC</span>
                  <ArrowDown className="w-4 h-4 transform group-hover/card:translate-y-0.5 transition-transform text-stone-400 group-hover/card:text-[#8E7015]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: Online Banner */}
        <section className="mt-16 sm:mt-20 bg-gradient-to-r from-[#241508] via-[#2E1B0A] to-[#241508] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-[#8E7015]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#C5A038] border border-[#8E7015]/40">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Dukungan Doa & Ibadah Online</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Tidak Dapat Hadir Secara Fisik?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Tetap terhubung dalam hadirat Tuhan melalui siaran langsung di kanal resmi kami setiap hari, atau hubungi kantor pastoral untuk permohonan doa dan konseling pribadi.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-center">
            <a
              href="https://youtube.com/@bjrbesronjusuproni"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#2E1B0A] hover:bg-stone-100 text-xs sm:text-sm font-bold transition-all shadow text-center no-underline cursor-pointer"
            >
              Kanal YouTube
            </a>
            <a
              href="https://wa.me/6287882520227?text=Halo%20GRI%20Zion%20Filadelfia,%20saya%20ingin%20bertanya%20jadwal%20ibadah%20/%20permohonan%20doa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8E7015] to-[#A98721] hover:from-[#A98721] hover:to-[#C5A038] text-white text-xs sm:text-sm font-bold transition-all shadow-md text-center no-underline cursor-pointer border border-[#C5A038]/40"
            >
              Hubungi Sekretariat (WA)
            </a>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Services;
"""

with codecs.open('src/pages/Services.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Done writing Services.tsx")
