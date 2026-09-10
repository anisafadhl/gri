import codecs

content = """import React from 'react';
import { Link } from 'react-router-dom';
import { useHeroImage } from '../hooks/useHeroImage';
import { ArrowDown, Radio, MessageCircle } from 'lucide-react';

export const Services: React.FC = () => {
  const heroImage = useHeroImage();

  const BRANCH_SCHEDULES: Array<{ id: string, city: string, name: string, services: Array<{ name: string, time: string, isLive?: boolean }>, extra?: any }> = [
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
        cpLink: 'https://wa.me/628818604979'
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

  const FULL_SCHEDULE_DATA = [
    {
      cityId: 'jakarta',
      cityName: 'JAKARTA BARAT',
      branchName: 'ZFM Jakarta',
      address: 'Ruko Mutiara Taman Palem Blok B10 No. 20, Cengkareng Timur, Jakarta Barat 11730',
      mapsUrl: 'https://maps.google.com/?q=Ruko+Mutiara+Taman+Palem+Blok+B10+No+20',
      services: [
        { name: 'Sunday Service', time: 'Minggu • Pk 07.00 WIB' },
        { name: 'PWBS (Pendalaman Alkitab)', time: 'Rabu • Pk 19.00 WIB' },
        { name: 'Mezbah Dupa', time: 'Jumat • Pk 19.00 WIB' },
      ],
      youthService: {
        name: 'Youth Service', time: 'Sabtu • Pk 17.00 WIB',
        cpName: 'Sdri. Nawang Wulansari', cpPhone: '0881-8604-979', rawPhone: '628818604979'
      },
      cics: [
        { name: 'CIC Penerobos', leader: 'Pdp. Daniel Sihombing', phone: '6282297420296' },
        { name: 'CIC Anak Panah', leader: 'Ibu Maria Ginting', phone: '6281372375300' },
        { name: 'CIC Pemenang', leader: 'Ibu Regina Sinaga', phone: '6281288530562' },
        { name: 'CIC Tunas Daud', leader: 'Sdri. Nawang Wulansari', phone: '628818604979' },
        { name: 'CIC Zoom International', leader: 'Pdp Lia Lestari Siahaan', phone: '6285361170982', badge: 'Daring / Online' },
      ]
    },
    {
      cityId: 'bekasi',
      cityName: 'KOTA BEKASI',
      branchName: 'ZFM Bekasi',
      address: 'Ruko Grand Centre Blok A15, Kota Bekasi',
      mapsUrl: 'https://maps.google.com/?q=Ruko+Grand+Centre+Blok+A15+Bekasi',
      services: [
        { name: 'Sunday Service', time: 'Minggu • Pk 11.00 WIB' },
        { name: 'PWBS (Pendalaman Alkitab)', time: 'Rabu • Pk 19.00 WIB' },
        { name: 'Mezbah Dupa', time: 'Jumat • Pk 19.00 WIB' },
      ],
      cics: [
        { name: 'CIC Ebenhaezer', leader: 'Pdp. Thomson Sitinjak', phone: '6281316987005' },
        { name: 'CIC Moria', leader: 'Pdp. Yoel Siki', phone: '6281246761316' },
        { name: 'CIC Anugerah', leader: 'Bpk Eddy Herwanto', phone: '6281281161178' },
      ]
    },
    {
      cityId: 'bandung',
      cityName: 'BANDUNG BARAT',
      branchName: 'ZFM Bandung',
      address: 'Ruko Bisnis Park TKI 2 No. 21, Bandung Barat',
      mapsUrl: 'https://maps.google.com/?q=Ruko+Bisnis+Park+TKI+2+No+21+Bandung',
      services: [
        { name: 'Sunday Service', time: 'Minggu • Pk 17.00 WIB' },
        { name: 'PWBS (Pendalaman Alkitab)', time: 'Senin • Pk 19.00 WIB' },
        { name: 'Mezbah Dupa', time: 'Jumat • Pk 19.00 WIB' },
      ],
      cics: [
        { name: 'CIC Glory', leader: 'Ibu Neni Sinaga', phone: '6281313052441' },
        { name: 'CIC Tsaleach', leader: 'Sdr. Andika Tobing', phone: '6285659528477' },
      ]
    },
    {
      cityId: 'toraja',
      cityName: 'TORAJA UTARA',
      branchName: 'ZFM Toraja',
      address: 'Toko Paolo Cell, Jl. Poros Kete Kesu, Toraja Utara',
      mapsUrl: 'https://maps.google.com/?q=Jl+Poros+Kete+Kesu+Toraja+Utara',
      services: [
        { name: 'Sunday Service', time: 'Minggu • Pk 08.00 WITA' },
        { name: 'Mezbah Dupa', time: 'Jumat • Pk 18.00 WITA' },
      ],
      cics: [
        { name: 'CIC Toraja', leader: 'Ibu Eriati', phone: '6285255808485' },
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
        
        {/* === SECTION A: GRID CARDS (Jadwal Resmi) === */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {BRANCH_SCHEDULES.map((branch) => (
            <div key={branch.id} className="bg-white rounded-[24px] overflow-hidden flex flex-col relative shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-lg transition-shadow border border-stone-100 group/card">
              {/* Top Gold Border */}
              <div className="h-2 w-full bg-gradient-to-r from-[#A98721] to-[#8E7015]" />
              
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <div className="mb-7">
                  <span className="text-[10px] font-bold text-[#8E7015] uppercase tracking-wider block mb-1.5">
                    CABANG • {branch.city}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#171717] tracking-tight">{branch.name}</h3>
                </div>
                
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
                  
                  {branch.extra && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A98721] shrink-0" />
                        <span className="text-sm font-bold text-[#171717]">{branch.extra.name}</span>
                        <span className="ml-auto bg-[#FBF9F5] text-[#8E7015] font-bold text-[10px] px-2.5 py-1 rounded-md border border-stone-200">
                          {branch.extra.timeBadge}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pl-4 pt-1">
                        <span className="text-[12px] text-stone-500 font-medium">{branch.extra.cpName}</span>
                        <a href={branch.extra.cpLink} target="_blank" rel="noopener noreferrer" className="bg-[#8E7015] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-[#7A5F0F] transition-colors shadow-sm no-underline">
                          {branch.extra.cpAction}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link to="/campuses" className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between text-[13px] font-bold text-[#171717] group-hover/card:text-[#8E7015] transition-colors no-underline">
                  <span>Lihat Komunitas CIC</span>
                  <ArrowDown className="w-4 h-4 transform group-hover/card:translate-y-0.5 transition-transform text-stone-400 group-hover/card:text-[#8E7015]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* === SECTION B: JADWAL LENGKAP & CIC (New Layout) === */}
        <section className="mt-20 sm:mt-32">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold text-[#8E7015] uppercase tracking-wider block mb-2">
              Wadah Persekutuan Rohani
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#171717] tracking-tight uppercase mb-4 sm:mb-6 leading-tight">
              Jadwal Lengkap & <br className="hidden sm:block" />Community In Christ
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed max-w-2xl mx-auto">
              <strong className="text-stone-700">Community In Christ (CIC)</strong> adalah keluarga rohani jemaat GRI Zion Filadelfia untuk saling menopang, bersekutu dalam firman Tuhan, dan bertumbuh bersama.
            </p>
          </div>

          {/* Cards Container */}
          <div className="space-y-8 sm:space-y-12">
            {FULL_SCHEDULE_DATA.map((branch) => (
              <div key={branch.cityId} className="bg-white rounded-[24px] sm:rounded-[32px] border border-stone-200/80 p-6 sm:p-8 md:p-10 shadow-sm transition-shadow hover:shadow-lg">
                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-stone-100 pb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">{branch.branchName}</h3>
                      <span className="bg-[#FDFBF7] border border-[#8E7015]/30 text-[#8E7015] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider shrink-0 shadow-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8E7015]" />
                        {branch.cityName}
                      </span>
                    </div>
                    <p className="text-stone-500 text-[13px] sm:text-sm max-w-2xl mt-1">{branch.address}</p>
                  </div>
                  <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-stone-200 bg-white text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors self-start md:self-center shrink-0 no-underline shadow-xs hover:border-[#8E7015]/30">
                    Buka di Google Maps &rarr;
                  </a>
                </div>

                {/* Card Body grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                  {/* Left Col: Jadwal Ibadah Resmi */}
                  <div className="lg:col-span-5">
                    <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">Jadwal Ibadah Resmi</h4>
                    <div className="space-y-3">
                      {branch.services.map((svc, idx) => (
                        <div key={idx} className="bg-[#FCFAF8] border border-stone-100 rounded-xl px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs transition-colors hover:border-[#8E7015]/20">
                          <span className="font-bold text-[14px] text-[#171717]">{svc.name}</span>
                          <span className="text-[13px] font-bold text-[#8E7015]">{svc.time}</span>
                        </div>
                      ))}
                      {branch.youthService && (
                        <div className="bg-[#FDFBF7] border border-[#EADDAC] rounded-xl overflow-hidden flex flex-col shadow-xs mt-4">
                          <div className="px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EADDAC]/50">
                            <span className="font-bold text-[14px] text-[#171717]">{branch.youthService.name}</span>
                            <span className="text-[13px] font-bold text-[#8E7015]">{branch.youthService.time}</span>
                          </div>
                          <div className="px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FDFBF7]/50">
                            <span className="text-[12px] text-stone-500 font-medium">CP: {branch.youthService.cpName}</span>
                            <a href={`https://wa.me/${branch.youthService.rawPhone}`} target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-[#8E7015] hover:text-[#A98721] flex items-center gap-1 transition-colors no-underline">
                              {branch.youthService.cpPhone} &rarr;
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Col: CIC */}
                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Community In Christ (CIC)</h4>
                      <span className="text-[11px] font-bold text-stone-400">{branch.cics.length} Komunitas Aktif</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {branch.cics.map((cic, idx) => (
                        <div key={idx} className="bg-[#FCFAF8] border border-stone-100 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:border-[#8E7015]/20 group/cic">
                          <div className="mb-5">
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-bold text-[14px] text-[#171717] leading-tight block">{cic.name}</span>
                              {cic.badge && (
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shrink-0">
                                  {cic.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[12px] text-stone-500 block mt-1.5 font-medium">Pimpinan: {cic.leader}</span>
                          </div>
                          <a href={`https://wa.me/${cic.phone}`} target="_blank" rel="noopener noreferrer" className="w-full py-2.5 rounded-lg border border-stone-200 bg-white text-[12px] font-bold text-[#171717] hover:border-[#8E7015]/40 hover:text-[#8E7015] transition-colors flex items-center justify-center gap-2 no-underline shadow-xs group-hover/cic:shadow-sm">
                            <MessageCircle className="w-4 h-4 text-stone-400 group-hover/cic:text-[#8E7015] transition-colors" />
                            Hubungi CP Sekarang
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Online Banner */}
        <section className="mt-16 sm:mt-24 bg-gradient-to-r from-[#241508] via-[#2E1B0A] to-[#241508] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-[#8E7015]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
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
