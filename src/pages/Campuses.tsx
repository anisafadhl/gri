import React, { useState } from 'react';
import { Copy, Search, Check, ArrowRight, ExternalLink } from 'lucide-react';

interface ScheduleItem {
  name: string;
  day: string;
  time: string;
  isLive?: boolean;
}

interface CampusLocation {
  id: string;
  name: string;
  regionTag: string;
  regionCategory: 'jabodetabek' | 'jabar' | 'sulawesi';
  address: string;
  addressLines: string[];
  schedules: ScheduleItem[];
  mapsUrl: string;
  embedSrc: string;
  searchKeywords: string;
}

const campusesData: CampusLocation[] = [
  {
    id: 'jkt',
    name: 'ZFM JAKARTA',
    regionTag: 'Jakarta Barat',
    regionCategory: 'jabodetabek',
    address: 'Ruko Mutiara Taman Palem Blok B10 No. 20, Jl. Taman Mutiara Palem, Cengkareng, Jakarta Barat 11730',
    addressLines: [
      'Ruko Mutiara Taman Palem Blok B10 No. 20',
      'Jl. Taman Mutiara Palem, Cengkareng, Jakarta Barat 11730'
    ],
    schedules: [
      { name: 'Sunday Service', day: 'Minggu', time: 'Pk 07.00 WIB' },
      { name: 'Mezbah Doa Pagi', day: 'Senin-Sabtu', time: 'Pk 05.00 WIB', isLive: true },
      { name: 'Praise Worship & Bible Study', day: 'Rabu', time: 'Pk 19.00 WIB' },
      { name: 'Mezbah Dupa', day: 'Jumat', time: 'Pk 19.00 WIB' },
      { name: 'Youth Service', day: 'Sabtu', time: 'Pk 17.00 WIB' }
    ],
    mapsUrl: 'https://maps.google.com/?q=Ruko+Mutiara+Taman+Palem+Blok+B10+No+20+Cengkareng+Jakarta+Barat',
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9754817441995!2d106.7262973!3d-6.1339891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d8212176b6d%3A0x6b81efcb86a237f8!2sRuko%20Mutiara%20Taman%20Palem!5e0!3m2!1sen!2sid!4v1700000000000',
    searchKeywords: 'zfm jakarta barat ruko mutiara taman palem cengkareng mezbah doa pagi pwbs dupa youth ibadah raya'
  },
  {
    id: 'bks',
    name: 'ZFM BEKASI',
    regionTag: 'Kota Bekasi',
    regionCategory: 'jabodetabek',
    address: 'Ruko Grand Centre, Jl. Cut Mutia 1 Blok A15, RT 001/RW/011, Margahayu, Kota Bekasi 17112',
    addressLines: [
      'Ruko Grand Centre, Jl. Cut Mutia 1',
      'Blok A15, RT 001/RW/011, Margahayu, Kota Bekasi 17112'
    ],
    schedules: [
      { name: 'Sunday Service', day: 'Minggu', time: 'Pk 07.00 WIB' },
      { name: 'Mezbah Doa Pagi', day: 'Senin-Sabtu', time: 'Pk 05.00 WIB', isLive: true },
      { name: 'Praise Worship & Bible Study', day: 'Rabu', time: 'Pk 19.00 WIB' },
      { name: 'Mezbah Dupa', day: 'Jumat', time: 'Pk 19.00 WIB' },
      { name: 'Youth Service', day: 'Sabtu', time: 'Pk 17.00 WIB', isLive: true }
    ],
    mapsUrl: 'https://maps.google.com/?q=Ruko+Grand+Centre+Jl+Cut+Mutia+Margahayu+Bekasi',
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.082991054366!2d107.004128!3d-6.2528029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698e8769c2889d%3A0xce3fb1f313cc0f45!2sRuko%20Grand%20Centre!5e0!3m2!1sen!2sid!4v1700000000000',
    searchKeywords: 'zfm bekasi ruko grand centre cut mutia margahayu mezbah doa pagi pwbs dupa youth ibadah raya'
  },
  {
    id: 'bdg',
    name: 'ZFM BANDUNG',
    regionTag: 'Bandung Barat',
    regionCategory: 'jabar',
    address: 'Ruko Bisnis Park, Jl. Raya Taman Kopo Indah 2 No. 21, Rahayu Kec. Margaasih, Kab. Bandung Barat 40216',
    addressLines: [
      'Ruko Bisnis Park, Jl. Raya Taman Kopo Indah 2',
      'No. 21, Rahayu Kec. Margaasih, Kab. Bandung Barat 40216'
    ],
    schedules: [
      { name: 'Sunday Service', day: 'Minggu', time: 'Pk 07.00 WIB' },
      { name: 'Mezbah Doa Pagi', day: 'Senin-Sabtu', time: 'Pk 05.00 WIB', isLive: true },
      { name: 'Praise Worship & Bible Study', day: 'Rabu', time: 'Pk 19.00 WIB' },
      { name: 'Mezbah Dupa', day: 'Jumat', time: 'Pk 19.00 WIB' },
      { name: 'Youth Service', day: 'Sabtu', time: 'Pk 17.00 WIB', isLive: true }
    ],
    mapsUrl: 'https://maps.google.com/?q=Ruko+Bisnis+Park+Taman+Kopo+Indah+2+Rahayu+Bandung',
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5369680075593!2d107.558364!3d-6.945826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68ee085376b88b%3A0x55bf22718160dbf!2sTaman%20Kopo%20Indah%202!5e0!3m2!1sen!2sid!4v1700000000000',
    searchKeywords: 'zfm bandung ruko bisnis park taman kopo indah margaasih rahayu mezbah doa pagi pwbs dupa youth ibadah raya'
  },
  {
    id: 'trj',
    name: 'ZFM TORAJA',
    regionTag: 'Toraja Utara',
    regionCategory: 'sulawesi',
    address: 'Toko Paolo Cell, Jl. Poros Kete Kesu (depan Gereja Karambe) Desa Rinding Batu, Kec. Kesu, Kab. Toraja Utara 91831',
    addressLines: [
      'Toko Paolo Cell, Jl. Poros Kete Kesu',
      '(depan Gereja Karambe) Desa Rinding Batu, Kec. Kesu, Kab. Toraja Utara 91831'
    ],
    schedules: [
      { name: 'Sunday Service', day: 'Minggu', time: 'Pk 08.00 WITA' },
      { name: 'Mezbah Doa Pagi', day: 'Senin-Sabtu', time: 'Pk 06.00 WITA', isLive: true },
      { name: 'Mezbah Dupa', day: 'Jumat', time: 'Pk 18.00 WITA' },
      { name: 'Youth Service', day: 'Sabtu', time: 'Pk 18.00 WITA', isLive: true },
      { name: 'Praise Worship & Bible Study', day: '', time: 'Melalui Live Streaming' }
    ],
    mapsUrl: "https://maps.google.com/?q=Tongkonan+Ke'te'+Kesu+Toraja+Utara",
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.8!2d119.89!3d-3.00!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d93e9a1a1a1a1a1%3A0x1!2sTongkonan%20Ke%27te%27%20Kesu%27!5e0!3m2!1sen!2sid!4v1700000000000',
    searchKeywords: 'zfm toraja utara paolo cell kete kesu rinding batu kesu mezbah doa pagi dupa youth ibadah raya'
  }
];

export const Campuses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'jabodetabek' | 'jabar' | 'sulawesi' | 'online'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMapId, setActiveMapId] = useState<string>('jkt');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address.trim());
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const filteredCampuses = campusesData.filter((c) => {
    const matchesTab = activeTab === 'all' || c.regionCategory === activeTab;
    const matchesSearch =
      searchQuery === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.searchKeywords.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const showOnlineCard =
    activeTab === 'all' ||
    activeTab === 'online' ||
    (searchQuery !== '' &&
      'live streaming youtube tiktok facebook instagram gembala sidang bjr besron jusup roni marpaung mezbah doa pagi online'
        .includes(searchQuery.toLowerCase()));

  const currentMapCampus = campusesData.find((c) => c.id === activeMapId) || campusesData[0];

  return (
    <div className="w-full bg-[#FBF9F5] text-[#171717] min-h-screen">
      {/* Toast Notification */}
      {copiedId && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
          <div className="flex items-center gap-2.5 bg-[#241508] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs sm:text-sm font-medium border border-[#8E7015]/30">
            <Check className="w-4 h-4 text-[#A98721] shrink-0" />
            <span>Alamat lengkap berhasil disalin!</span>
          </div>
        </div>
      )}

      {/* Universal Hero Banner */}
      <section
        className="h-[45vh] min-h-[320px] flex flex-col justify-center items-center text-center text-white px-[5%] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.6)), url('/Gereja Rasuli Indonesia Jemaat Zion Filadelfia.png')`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider drop-shadow-md">
          Our Campuses
        </h1>
      </section>

      {/* Main Content Container */}
      <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        {/* Controls Bar: Category Tabs & Search Input */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'all', label: 'Semua Lokasi' },
              { key: 'jabodetabek', label: 'Jabodetabek' },
              { key: 'jabar', label: 'Jawa Barat' },
              { key: 'sulawesi', label: 'Sulawesi' },
              { key: 'online', label: 'Live Streaming' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-transparent ${
                  activeTab === tab.key
                    ? 'bg-[#2E1B0A] text-white border-[#2E1B0A]'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-[#171717]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kota, wilayah, atau cabang..."
              className="w-full bg-[#FBF9F5] border border-stone-200 rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-[#171717] placeholder-stone-400 focus:outline-none focus:bg-white focus:border-[#8E7015] focus:ring-1 focus:ring-[#8E7015] transition-all"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Campuses List (Memanjang Horizontal) */}
        <div className="flex flex-col gap-6">
          {activeTab !== 'online' &&
            filteredCampuses.map((campus) => (
              <div
                key={campus.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 lg:p-8 shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-[#8E7015]/40 transition-all duration-300 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-8 relative overflow-hidden"
              >
                {/* Left Column: Details & Address */}
                <div className="lg:w-4/12 space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
                      {campus.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FBF9F5] border border-stone-200 text-stone-600 text-[11px] font-semibold shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8E7015] animate-pulse"></span>
                      {campus.regionTag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                    {campus.addressLines.map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx < campus.addressLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>

                  <button
                    onClick={() => handleCopy(campus.address, campus.id)}
                    className="text-[11px] font-semibold text-[#8E7015] hover:text-[#A98721] flex items-center gap-1.5 pt-0.5 transition-colors"
                  >
                    {copiedId === campus.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#8E7015]" />
                        <span className="font-bold">Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Center Column: Schedules Table */}
                <div className="lg:w-5/12 border-t lg:border-t-0 lg:border-l border-stone-100 pt-4 lg:pt-0 lg:pl-8 space-y-2">
                  {campus.schedules.map((sch, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-12 text-xs sm:text-[13px] gap-2 items-center ${
                        sch.day === '' ? 'text-stone-400' : 'text-[#171717]'
                      }`}
                    >
                      <div
                        className={`col-span-6 font-medium ${
                          sch.day === '' ? 'italic font-normal' : 'text-stone-700'
                        }`}
                      >
                        {sch.name}{' '}
                        {sch.isLive && (
                          <span className="text-[10px] text-[#8E7015] font-semibold">(Live)</span>
                        )}
                      </div>
                      <div className="col-span-3 text-stone-500 font-medium">{sch.day}</div>
                      <div
                        className={`col-span-3 text-right ${
                          sch.day === ''
                            ? 'font-medium text-stone-500 col-span-6'
                            : 'font-bold text-[#171717]'
                        }`}
                      >
                        {sch.time}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column: Find Location CTA Button */}
                <div className="lg:w-3/12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-stone-100 pt-4 lg:pt-0 lg:pl-8">
                  <a
                    href={campus.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#8E7015] hover:bg-[#A98721] shadow-xs transition-all text-center tracking-wide group no-underline"
                  >
                    <span>Find Location</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}

          {/* Live Streaming & Pastoral Care (Full Width Dark Earth Card) */}
          {showOnlineCard && (
            <div className="campus-card bg-gradient-to-r from-[#241508] via-[#2E1B0A] to-[#241508] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 border border-[#8E7015]/30">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#A98721] border border-[#8E7015]/40">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>Live Streaming</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Live Streaming Ibadah & Pelayanan
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                    Terhubung bersama kami setiap hari melalui Mezbah Doa Pagi dan ibadah raya di saluran resmi:
                  </p>
                </div>

                {/* Social Channels */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      f
                    </span>
                    <span className="font-medium text-stone-200">PS. BESRON JUSUP RONI MARPAUNG</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-neutral-100">
                      <span className="w-5 h-5 rounded bg-red-600 flex items-center justify-center text-[10px] font-bold">
                        ▶
                      </span>
                      <span className="w-5 h-5 rounded bg-black border border-white/30 flex items-center justify-center text-[10px] font-bold">
                        ♪
                      </span>
                      <span className="w-5 h-5 rounded bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 flex items-center justify-center text-[10px] font-bold">
                        📷
                      </span>
                    </div>
                    <span className="font-bold text-white tracking-wide">BJR BESRON JUSUP RONI</span>
                  </div>
                </div>

                {/* Pastoral Contact */}
                <div className="pt-2 border-t border-white/10 text-xs text-stone-300">
                  <p className="leading-relaxed">
                    Untuk Permohonan Doa, Baptisan, Konseling, Pernikahan, dll. Silahkan hubungi Gembala Sidang:
                  </p>
                  <p className="text-[#A98721] font-bold text-sm mt-1">
                    WA (Gembala Sidang): 0878 8252 0227
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 justify-center">
                <a
                  href="https://youtube.com/@bjrbesronjusuproni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#2E1B0A] hover:bg-stone-100 text-center transition-colors shadow-xs no-underline"
                >
                  Tonton di YouTube
                </a>
                <a
                  href="https://wa.me/6287882520227?text=Halo%20Gembala%20Sidang%20GRI%20Zion%20Filadelfia,%20saya%20ingin%20mengajukan%20permohonan%20doa%20/%20konseling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#8E7015] text-white hover:bg-[#A98721] text-center transition-colors shadow-xs no-underline"
                >
                  Hubungi Gembala Sidang
                </a>
              </div>
            </div>
          )}

          {/* No Results Block */}
          {activeTab !== 'online' && filteredCampuses.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 mt-2">
              <h4 className="text-base font-bold text-[#171717] mb-1">Lokasi tidak ditemukan</h4>
              <p className="text-xs text-stone-500">
                Coba gunakan kata kunci pencarian yang lain atau pilih tab "Semua Lokasi".
              </p>
            </div>
          )}
        </div>

        {/* Interactive Map Selector Section */}
        <div className="mt-14 sm:mt-16 bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#8E7015] uppercase tracking-wider mb-1">
                Navigasi & Rute
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717]">
                Peta Lokasi Cabang
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Pilih cabang untuk melihat navigasi langsung di Google Maps.
              </p>
            </div>

            {/* City Switcher Pill Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#FBF9F5] p-1.5 rounded-2xl border border-stone-200">
              {campusesData.map((campus) => (
                <button
                  key={campus.id}
                  onClick={() => setActiveMapId(campus.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeMapId === campus.id
                      ? 'bg-[#2E1B0A] text-white'
                      : 'text-stone-600 hover:text-[#171717]'
                  }`}
                >
                  {campus.name.replace('ZFM ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Embedded Map Frame */}
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 relative shadow-inner">
            <iframe
              title="Peta Cabang Gereja"
              src={currentMapCampus.embedSrc}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-500">
            <span>
              📍 <strong>{currentMapCampus.name}</strong>: {currentMapCampus.address}
            </span>
            <a
              href={currentMapCampus.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#8E7015] hover:text-[#A98721] hover:underline shrink-0 transition-colors inline-flex items-center gap-1 no-underline"
            >
              <span>Buka di Aplikasi Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
