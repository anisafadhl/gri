import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHeroImage } from '../hooks/useHeroImage';
import { 
  Clock, 
  MapPin, 
  Radio, 
  Calendar, 
  ArrowRight, 
  Users, 
  BookOpen, 
  Flame, 
  Sparkles, 
  Heart, 
  Sun,
  CheckCircle2,
  Phone,
  MessageCircle
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'general' | 'prayer' | 'youth';
  categoryLabel: string;
  time: string;
  days: string;
  isLive?: boolean;
  featured?: boolean;
  description: string;
  highlights: string[];
  locations: string;
  channelInfo?: string;
  iconType: 'sun' | 'worship' | 'bible' | 'flame' | 'youth' | 'kids';
  picName?: string;
  picContact?: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ibadah-raya',
    title: 'Ibadah Raya Minggu',
    subtitle: 'Sunday Worship Service',
    category: 'general',
    categoryLabel: 'Ibadah Umum',
    time: 'Pk 07.00 WIB / 08.00 WITA',
    days: 'Setiap Hari Minggu',
    isLive: true,
    featured: true,
    description: 'Ibadah perayaan dan hadirat Tuhan bagi seluruh keluarga. Dilengkapi puji-pujian profetik yang membangkitkan iman, perjamuan kudus, dan penaburan kebenaran Firman Tuhan yang memerdekakan.',
    highlights: ['Penyembahan Profetik', 'Khotbah Mengubahkan', 'Perjamuan Kudus', 'Ramah Keluarga'],
    locations: 'Semua Cabang (Jakarta, Bekasi, Bandung, Toraja)',
    channelInfo: 'Live YouTube & Onsite',
    iconType: 'worship',
    picName: 'Sekretariat Ibadah Raya',
    picContact: '0878-8026-8021'
  },
  {
    id: 'mezbah-doa-pagi',
    title: 'Mezbah Doa Pagi (MDP)',
    subtitle: 'Daily Morning Prayer Altar',
    category: 'prayer',
    categoryLabel: 'Mezbah Doa & Firman',
    time: 'Pk 05.00 – 07.00 WIB (06.00 WITA)',
    days: 'Setiap Senin – Sabtu',
    isLive: true,
    featured: true,
    description: 'Membangun mezbah doa harian di fajar hari untuk menyembah Tuhan, merenungkan khotbah berseri dari kitab ke kitab, dan menerima kekuatan ilahi sebelum memulai aktivitas.',
    highlights: ['Khotbah Berseri', 'Penyembahan Fajar', 'Doa Syafaat Harian', 'Ribuan Jemaat Online'],
    locations: 'ZFM Jakarta & Multi-Platform Streaming',
    channelInfo: 'Live Streaming Setiap Hari',
    iconType: 'sun',
    picName: 'Tim Doa & Konseling',
    picContact: '0878-8252-0227'
  },
  {
    id: 'pwbs',
    title: 'Praise Worship & Bible Study',
    subtitle: 'PWBS - Pendalaman Alkitab',
    category: 'prayer',
    categoryLabel: 'Mezbah Doa & Firman',
    time: 'Pk 19.00 WIB',
    days: 'Setiap Hari Rabu',
    isLive: false,
    featured: false,
    description: 'Penyelidikan Alkitab secara mendalam, ekspositori, dan doktrinal yang murni. Menjawab pertanyaan-pertanyaan iman serta memperlengkapi jemaat dengan pemahaman firman yang kokoh.',
    highlights: ['Eksposisi Alkitab', 'Diskusi Firman', 'Pengajaran Doktrin Murni', 'Tumbuh Dewasa'],
    locations: 'ZFM Jakarta, Bekasi, Bandung',
    channelInfo: 'Onsite & Zoom Fellowship',
    iconType: 'bible',
    picName: 'Divisi Pengajaran & PWBS',
    picContact: '0878-8026-8021'
  },
  {
    id: 'mezbah-dupa',
    title: 'Mezbah Dupa',
    subtitle: 'Night Prayer & Intercession',
    category: 'prayer',
    categoryLabel: 'Mezbah Doa & Firman',
    time: 'Pk 19.00 WIB (18.00 WITA)',
    days: 'Setiap Hari Jumat',
    isLive: false,
    featured: false,
    description: 'Waktu persekutuan doa syafaat yang intens, doa peperangan rohani, dan penyembahan intim. Menaikkan doa-doa jemaat bagaikan dupa yang berbau harum di hadapan takhta kasih karunia Allah.',
    highlights: ['Doa Peperangan Rohani', 'Pemulihan Keluarga', 'Doa Pengurapan & Kesembuhan', 'Hadirat Kudus'],
    locations: 'Seluruh Gedung Gereja Cabang',
    channelInfo: 'Pelayanan Doa Onsite',
    iconType: 'flame',
    picName: 'Tim Doa Syafaat',
    picContact: '0878-8252-0227'
  },
  {
    id: 'youth',
    title: 'ZFM Youth Service',
    subtitle: 'Ibadah Pemuda & Remaja',
    category: 'youth',
    categoryLabel: 'Generasi Muda',
    time: 'Pk 17.00 WIB (18.00 WITA)',
    days: 'Setiap Hari Sabtu',
    isLive: true,
    featured: false,
    description: 'Wadah bagi kaum muda dan remaja untuk menemukan jati diri dalam Kristus, menyembah dengan semangat membara, mempererat persaudaraan tulus, serta diperlengkapi untuk berdampak bagi dunia.',
    highlights: ['Worship Energik', 'Pesan Relevan Kaum Muda', 'Komunitas Tulus', 'Pengembangan Talenta'],
    locations: 'ZFM Jakarta & Cabang',
    channelInfo: 'Onsite & YouTube Stream',
    iconType: 'youth',
    picName: 'PIC ZFM Youth Ministry',
    picContact: '0878-8026-8021'
  },
  {
    id: 'kids',
    title: 'Sekolah Minggu (Kids Church)',
    subtitle: 'Children Generation Altar',
    category: 'youth',
    categoryLabel: 'Generasi Muda',
    time: 'Pk 07.00 WIB / 08.00 WITA',
    days: 'Setiap Hari Minggu',
    isLive: false,
    featured: false,
    description: 'Membimbing dan menanamkan nilai-nilai kebenaran Firman Allah sejak dini kepada anak-anak melalui pujian ceria, visual storytelling Alkitab, dan pembinaan karakter yang mengasihi Tuhan.',
    highlights: ['Storytelling Alkitab', 'Pujian Ceria', 'Aktivitas Kreatif', 'Pengasuhan Penuh Kasih'],
    locations: 'Ruang Kids di Seluruh Cabang',
    channelInfo: 'Kelas Berdasarkan Usia Anak',
    iconType: 'kids',
    picName: 'PIC Kids Ministry',
    picContact: '0878-8026-8021'
  }
];

const renderServiceIcon = (type: ServiceItem['iconType']) => {
  switch (type) {
    case 'worship':
      return <Users className="w-6 h-6 text-[#8E7015]" />;
    case 'sun':
      return <Sun className="w-6 h-6 text-[#8E7015]" />;
    case 'bible':
      return <BookOpen className="w-6 h-6 text-[#8E7015]" />;
    case 'flame':
      return <Flame className="w-6 h-6 text-[#8E7015]" />;
    case 'youth':
      return <Sparkles className="w-6 h-6 text-[#8E7015]" />;
    case 'kids':
      return <Heart className="w-6 h-6 text-[#8E7015]" />;
    default:
      return <Calendar className="w-6 h-6 text-[#8E7015]" />;
  }
};

export const Services: React.FC = () => {
  const heroImage = useHeroImage();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'general' | 'prayer' | 'youth'>('all');

  const filteredServices = SERVICES_DATA.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="w-full font-sans antialiased text-[#171717] bg-[#FBF9F5]">
      
      {/* 1. Hero Banner: Earth & Gold Atmosphere */}
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
      <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Heading & Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold text-[#8E7015] uppercase tracking-wider block mb-1">
              GRI Zion Filadelfia
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-[#171717] tracking-tight uppercase">
              Jadwal Ibadah Kami
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
              Bergabunglah dalam mezbah doa, ibadah mingguan, dan kelompok pembinaan rohani di berbagai cabang maupun daring.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-2xs self-start md:self-end">
            {[
              { key: 'all', label: 'Semua Ibadah' },
              { key: 'general', label: 'Ibadah Raya' },
              { key: 'prayer', label: 'Mezbah Doa & Firman' },
              { key: 'youth', label: 'Pemuda & Anak' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedFilter(tab.key as any)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                  selectedFilter === tab.key
                    ? 'bg-[#2E1B0A] text-white shadow-xs'
                    : 'text-stone-600 hover:text-[#171717] hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1.5 relative overflow-hidden group ${
                service.featured 
                  ? 'border-[#8E7015]/40 ring-1 ring-[#8E7015]/20' 
                  : 'border-stone-200/90 hover:border-[#8E7015]/30'
              }`}
            >
              {/* Subtle Ambient Gold Tint for Featured Cards */}
              {service.featured && (
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#8E7015]/10 to-transparent rounded-bl-full pointer-events-none" />
              )}

              <div className="space-y-4 sm:space-y-5">
                
                {/* Header Row: Icon Box & Badges */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FBF9F5] border border-stone-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#8E7015] group-hover:text-white transition-colors duration-300">
                    {renderServiceIcon(service.iconType)}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {service.isLive && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        Live Stream
                      </span>
                    )}
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                      {service.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Service Title & Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#171717] tracking-tight group-hover:text-[#8E7015] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <span className="text-xs text-stone-400 font-medium block mt-0.5">
                    {service.subtitle}
                  </span>
                </div>

                {/* Time & Day Pill Card */}
                <div className="bg-[#FBF9F5] p-3.5 rounded-2xl border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8E7015]">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{service.days}</span>
                  </div>
                  <div className="text-sm font-extrabold font-mono text-[#171717] pl-6">
                    {service.time}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Key Highlights */}
                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Fokus Pelayanan
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1 text-[11px] font-medium bg-stone-100/70 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200/60"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#8E7015]" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* PIC Contact Pill */}
                {service.picContact && (
                  <div className="pt-1">
                    <a
                      href={`https://wa.me/${service.picContact.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(service.picName || 'PIC')},%20saya%20ingin%20bertanya%20mengenai%20${encodeURIComponent(service.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 px-3 rounded-xl bg-[#FBF9F5] hover:bg-[#F3EEDF] border border-stone-200/90 hover:border-[#8E7015]/40 transition-colors group/pic no-underline"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-lg bg-[#8E7015]/10 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-3.5 h-3.5 text-[#8E7015]" />
                        </div>
                        <div className="text-[11px] leading-tight truncate">
                          <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">PIC Pelayanan</span>
                          <span className="font-bold text-stone-800 group-hover/pic:text-[#8E7015] transition-colors">{service.picName}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#8E7015] shrink-0 ml-2">
                        {service.picContact}
                      </span>
                    </a>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-5 mt-6 border-t border-stone-100 flex flex-col gap-3">
                <div className="flex items-start gap-2 text-[11px] text-stone-500 leading-tight">
                  <MapPin className="w-3.5 h-3.5 text-[#8E7015] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{service.locations}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[11px] font-bold text-stone-400">
                    {service.channelInfo}
                  </span>

                  <Link
                    to="/campuses"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E7015] hover:text-[#C5A038] transition-colors no-underline group/link"
                  >
                    <span>Cek Lokasi</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 3. Summary Schedule by Church Campuses with PIC */}
        <section className="mt-16 sm:mt-24 bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E7015] block">
              Ringkasan Jadwal Ibadah Minggu
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold font-heading text-[#171717] tracking-tight">
              Jadwal di Setiap Cabang Gereja
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Silakan hadir di cabang terdekat dengan domisili Anda untuk beribadah bersama atau hubungi PIC cabang setempat:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                city: 'Jakarta Barat',
                name: 'ZFM Jakarta',
                sundayTime: 'Pk 07.00 WIB',
                location: 'Ruko Mutiara Taman Palem B10/20',
                picName: 'Sekretariat Jakarta',
                picContact: '0878-8026-8021'
              },
              {
                city: 'Kota Bekasi',
                name: 'ZFM Bekasi',
                sundayTime: 'Pk 07.00 WIB',
                location: 'Ruko Grand Centre Blok A15',
                picName: 'PIC ZFM Bekasi',
                picContact: '0878-8252-0227'
              },
              {
                city: 'Bandung Barat',
                name: 'ZFM Bandung',
                sundayTime: 'Pk 07.00 WIB',
                location: 'Ruko Bisnis Park TKI 2 No. 21',
                picName: 'PIC ZFM Bandung',
                picContact: '0878-8026-8021'
              },
              {
                city: 'Toraja Utara',
                name: 'ZFM Toraja',
                sundayTime: 'Pk 08.00 WITA',
                location: 'Toko Paolo Cell, Jl. Poros Kete Kesu',
                picName: 'PIC ZFM Toraja',
                picContact: '0878-8252-0227'
              },
            ].map((cabang, cIdx) => (
              <div
                key={cIdx}
                className="bg-[#FBF9F5] rounded-2xl p-4 sm:p-5 border border-stone-200/80 hover:border-[#8E7015]/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#8E7015] uppercase tracking-wider">
                      {cabang.city}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#8E7015]" />
                  </div>
                  <h4 className="text-base font-bold font-heading text-[#171717]">
                    {cabang.name}
                  </h4>
                  <div className="text-xs font-mono font-bold text-stone-800 bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 inline-block">
                    Ibadah: {cabang.sundayTime}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {cabang.location}
                  </p>

                  {/* PIC Cabang */}
                  <a
                    href={`https://wa.me/${cabang.picContact.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(cabang.picName)},%20saya%20ingin%20bertanya%20info%20ibadah%20${encodeURIComponent(cabang.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[11px] bg-white p-2 rounded-xl border border-stone-200/70 hover:border-[#8E7015]/50 transition-colors text-stone-600 hover:text-[#171717] no-underline mt-2 group/cabangpic"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Phone className="w-3 h-3 text-[#8E7015] shrink-0" />
                      <span className="truncate font-medium">{cabang.picName}</span>
                    </span>
                    <span className="font-mono font-bold text-[#8E7015] shrink-0 text-[10px]">
                      {cabang.picContact}
                    </span>
                  </a>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-200/60 text-right">
                  <Link
                    to="/campuses"
                    className="text-[11px] font-bold text-[#8E7015] hover:underline inline-flex items-center gap-1"
                  >
                    Lihat Peta & Rute →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="mt-12 sm:mt-16 bg-gradient-to-r from-[#241508] via-[#2E1B0A] to-[#241508] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-[#8E7015]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#C5A038] border border-[#8E7015]/40">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>Dukungan Doa & Ibadah Online</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
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