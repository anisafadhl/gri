import React, { useEffect, useState, useRef } from 'react';
import { getEvents } from '../lib/supabase';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useHeroImage } from '../hooks/useHeroImage';

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  time?: string;
  duration?: string;
}

function parseEventDate(dateStr: string, timeProp?: string, durationProp?: string) {
  if (!dateStr) {
    return { topDate: '', mainDate: '—', timeText: timeProp || durationProp || '' };
  }

  let cleanDate = dateStr.trim();
  let extractedTime = timeProp || durationProp || '';

  const separators = [' • ', ' | ', ' @ ', ' - Pk ', ' Pk ', ' pk ', ' pukul '];
  for (const sep of separators) {
    if (cleanDate.includes(sep)) {
      const parts = cleanDate.split(sep);
      cleanDate = parts[0].trim();
      if (!extractedTime && parts[1]) {
        extractedTime = parts.slice(1).join(' ').trim();
        if (
          !extractedTime.toLowerCase().startsWith('pk') &&
          !extractedTime.toLowerCase().startsWith('pukul') &&
          extractedTime.includes(':')
        ) {
          extractedTime = `Pk ${extractedTime}`;
        }
      }
      break;
    }
  }

  const dayFirstMatch = cleanDate.match(/^([0-9\s\-\–]+)\s+([a-zA-Z]+)(?:[,\s]+([0-9]{4}))?/);
  if (dayFirstMatch) {
    const day = dayFirstMatch[1].trim();
    const month = dayFirstMatch[2].trim();
    const year = dayFirstMatch[3] || '';
    return {
      topDate: year ? `${month} ${year}`.toUpperCase() : month.toUpperCase(),
      mainDate: day,
      timeText: extractedTime || 'Pk 18.00 WIB'
    };
  }

  const monthFirstMatch = cleanDate.match(/^([a-zA-Z]+)\s+([0-9\s\-\–]+)(?:[,\s]+([0-9]{4}))?/);
  if (monthFirstMatch) {
    const month = monthFirstMatch[1].trim();
    const day = monthFirstMatch[2].trim();
    const year = monthFirstMatch[3] || '';
    return {
      topDate: year ? `${month} ${year}`.toUpperCase() : month.toUpperCase(),
      mainDate: day,
      timeText: extractedTime || 'Pk 18.00 WIB'
    };
  }

  return {
    topDate: '',
    mainDate: cleanDate,
    timeText: extractedTime || ''
  };
}

/* Data cadangan hanya dipakai jika Supabase benar-benar gagal/offline */
const FALLBACK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: '7-Day Sabbath Revival Crusade',
    category: 'Revival Crusade',
    date: '12 – 18 Oktober 2026',
    location: 'Semua Cabang (Jakarta, Bekasi, Bandung, Toraja)',
    duration: '12 – 18 Okt 2026',
    description: "A dedicated time to dwell in God's presence, experience deep spiritual restoration, breakthroughs, and a fresh apostolic anointing. Bring your entire family and community.",
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    time: 'Pk 05.00 & 19.00 WIB'
  },
  {
    id: '2',
    title: 'Ibadah Malam Natal Bersama',
    category: 'Perayaan Khusus',
    date: '24 Desember 2026 • 18:00 WIB',
    location: 'Main Hall – Jemaat Zion Filadelfia',
    duration: '24 Desember 2026',
    description: 'Mari rayakan momen syahdu kelahiran Juru Selamat bersama seluruh jemaat dan keluarga tercinta. Tersedia jamuan makan malam bersama setelah ibadah selesai.',
    image: '',
    time: 'Pk 18.00 WIB'
  },
  {
    id: '3',
    title: 'Youth & Congregation Retreat',
    category: 'Fellowship Retreat',
    date: '4 – 6 Desember 2026',
    location: 'Puncak Mountain Resort',
    duration: '3 Hari 2 Malam',
    description: 'Deepening intimacy with Christ through joyful fellowship, prophetic worship encounters, group bonding activities, and empowering biblical workshops.',
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80',
    time: 'Puncak, Jawa Barat'
  },
  {
    id: '4',
    title: 'Holy Spirit Anointing Night',
    category: 'Annual Assembly',
    date: '15 Januari 2027',
    location: 'ZFM Jakarta & Live Streaming',
    duration: '15 Jan 2027',
    description: 'An extraordinary night of high praise, prophetic prayer, and worship welcoming the new season of ministry breakthroughs across all church branches.',
    image: '',
    time: 'Pk 18.30 WIB – Selesai'
  }
];

export const Events: React.FC = () => {
  const heroImage = useHeroImage();
  // State dimulai dari array kosong dan loading = true agar TIDAK ada glitch flash data lama
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -440, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 440, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchEventsList = async () => {
      try {
        const data = await getEvents();
        if (isMounted) {
          if (data && data.length > 0) {
            setEvents(data);
          } else {
            setEvents(FALLBACK_EVENTS);
          }
        }
      } catch (error) {
        console.warn('Menggunakan fallback data acara:', error);
        if (isMounted) {
          setEvents(FALLBACK_EVENTS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEventsList();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FBF9F5] text-[#171717] font-sans antialiased selection:bg-[#C5A038]/20 selection:text-[#2E1B0A]">
      
      {}
      <section
        className="relative h-[48vh] min-h-[350px] flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(46, 27, 10, 0.65) 0%, rgba(46, 27, 10, 0.85) 100%), url('${heroImage}')`,
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-4 pt-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#C5A038] border border-white/15 tracking-widest uppercase">
            Agenda &amp; Pelayanan Jemaat
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white drop-shadow-xl font-heading">
            Upcoming Events
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-stone-200 font-light leading-relaxed drop-shadow">
            &ldquo;Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan...&rdquo; &mdash; Yeremia 29:11
          </p>
        </div>
      </section>

      {}
      <main className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar & Status Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 px-1">
          <div>
            <span className="text-xs font-bold text-[#8E7015] uppercase tracking-wider block mb-1">
              GRI Zion Filadelfia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#171717] tracking-tight uppercase">
              Jadwal Kegiatan Mendatang
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Geser ke samping untuk melihat seluruh agenda ibadah khusus, perayaan, dan retret rohani.
            </p>
          </div>

          {/* Navigasi Swipe Hint & Desktop Arrow Buttons */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className="text-[11px] text-stone-400 flex items-center gap-1 sm:hidden">
              <span>Geser ke samping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>

            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={scrollLeft}
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 hover:text-[#8E7015] hover:border-[#8E7015] hover:bg-[#FBF9F5] transition-all shadow-2xs active:scale-95 cursor-pointer"
                aria-label="Geser ke kiri"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={scrollRight}
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 hover:text-[#8E7015] hover:border-[#8E7015] hover:bg-[#FBF9F5] transition-all shadow-2xs active:scale-95 cursor-pointer"
                aria-label="Geser ke kanan"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {}
        {loading ? (
          /* Tampilan Skeleton yang mulus saat refresh: tidak ada teks lama yang meloncat */
          <div className="flex gap-4 sm:gap-6 overflow-hidden py-2">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="shrink-0 w-[85vw] sm:w-[500px] lg:w-[560px] bg-white rounded-3xl border border-stone-200 p-6 animate-pulse space-y-4 shadow-xs"
              >
                <div className="w-full h-52 bg-stone-200/80 rounded-2xl"></div>
                <div className="h-5 bg-stone-200/80 rounded-md w-3/4"></div>
                <div className="h-4 bg-stone-200/80 rounded-md w-full"></div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="h-12 bg-stone-200/60 rounded-xl"></div>
                  <div className="h-12 bg-stone-200/60 rounded-xl"></div>
                </div>
                <div className="h-11 bg-stone-200/80 rounded-xl mt-4"></div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="min-h-[350px] bg-white rounded-3xl border border-stone-200 flex flex-col items-center justify-center p-8 text-center shadow-xs">
            <Calendar className="w-12 h-12 text-[#8E7015]/40 mb-3" />
            <h3 className="text-base font-bold text-stone-800">Belum Ada Agenda Mendatang</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm">
              Jadwal kegiatan atau perayaan khusus akan segera diperbarui. Silakan periksa kembali secara berkala.
            </p>
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            aria-label="Daftar agenda acara mendatang"
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 focus:outline-none focus:ring-1 focus:ring-[#8E7015]/30 rounded-3xl"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {events.map((ev, idx) => {
              const hasImg = Boolean(ev.image && ev.image.trim() !== '' && ev.image !== '/event.png');
              const { topDate, mainDate, timeText } = parseEventDate(ev.date, ev.time, ev.duration);
              const categoryBadge = (ev.category || 'Special Event').split('•')[0].trim();

              let fontSizeClass = 'text-5xl sm:text-6xl';
              if (mainDate.length > 2 && mainDate.length <= 8) {
                fontSizeClass = 'text-4xl sm:text-5xl';
              } else if (mainDate.length > 8) {
                fontSizeClass = 'text-2xl sm:text-3xl';
              }

              return (
                <div
                  key={ev.id || idx}
                  className="snap-start shrink-0 w-[85vw] sm:w-[500px] lg:w-[560px] bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    
                    {/* Visual Banner */}
                    {hasImg ? (
                      /* 1. Image Banner */
                      <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#2E1B0A]/85 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15 font-bold text-[#C5A038] text-[11px] shadow">
                            {categoryBadge}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* 2. Date Art Banner (Signature Earth & Gold Dark Espresso Theme) */
                      <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-br from-[#2E1B0A] via-[#241508] to-[#171717] p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-inner border border-white/5">
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#8E7015]/25 rounded-full blur-2xl pointer-events-none" />

                        {/* Top: Category Badge */}
                        <div className="flex items-center justify-start text-xs relative z-10 w-full">
                          <span className="bg-white/10 px-3 py-1 rounded-xl border border-white/10 font-bold text-[#C5A038] text-[11px]">
                            {categoryBadge}
                          </span>
                        </div>

                        {/* Center: Month + Huge Day + Time */}
                        <div className="space-y-0.5 my-auto text-center relative z-10 py-1 w-full">
                          {topDate && (
                            <span className="text-[11px] font-bold tracking-widest text-[#C5A038] uppercase block">
                              {topDate}
                            </span>
                          )}
                          <span className={`${fontSizeClass} font-black text-white leading-none block py-1 drop-shadow`}>
                            {mainDate}
                          </span>
                          <span className="text-[11px] text-stone-300 font-light block">
                            {timeText || ev.time || 'Pk 18.00 WIB'}
                          </span>
                        </div>

                        {/* Bottom-Left: Location Pin */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-start text-[11px] text-stone-300 relative z-10 w-full">
                          <span className="flex items-center gap-1.5 truncate max-w-full">
                            <span className="text-[#e11d48]">📍</span>
                            <span className="truncate">{ev.location}</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Event Content Information */}
                    <div>
                      <span className="text-[11px] font-bold text-[#8E7015] uppercase tracking-wider block mb-1">
                        {categoryBadge}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#171717] leading-tight line-clamp-2 group-hover:text-[#8E7015] transition-colors">
                        {ev.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed line-clamp-3 font-normal">
                        {ev.description}
                      </p>
                    </div>

                    {/* Schedule & Location Details Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <div className="bg-[#FBF9F5] p-2.5 rounded-xl border border-stone-200/80">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                          Jadwal
                        </span>
                        <span className="font-bold text-[#171717] truncate block mt-0.5">
                          {topDate ? `${mainDate} ${topDate.split(' ')[0]}` : mainDate}
                        </span>
                      </div>
                      <div className="bg-[#FBF9F5] p-2.5 rounded-xl border border-stone-200/80">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                          Lokasi
                        </span>
                        <span className="font-bold text-[#171717] truncate block mt-0.5">
                          {ev.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action: Direct WhatsApp Reservation */}
                  <div className="pt-5 mt-5 border-t border-stone-100">
                    <a
                      href={`https://wa.me/6287882520227?text=Halo%20Sekretariat%20GRI%20Zion%20Filadelfia,%20saya%20ingin%20mendaftar%20/%20bertanya%20mengenai%20acara%20${encodeURIComponent(
                        ev.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#8E7015] hover:bg-[#A98721] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md no-underline cursor-pointer"
                    >
                      <span>Reserve a Seat (WhatsApp)</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

    </div>
  );
};

export default Events;