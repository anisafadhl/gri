import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../lib/supabase';
import { ArrowRight, ArrowLeft } from 'lucide-react';

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

const DEFAULT_EVENTS: EventItem[] = [
  {
    id: '1',
    title: '7-Day Sabbath Revival Crusade',
    category: 'Revival Crusade',
    date: '12 – 18 Oktober 2026',
    location: 'Semua Cabang (Jakarta, Bekasi, Bandung, Toraja)',
    duration: '12 – 18 Okt 2026',
    description: 'A dedicated time to dwell in God\'s presence, experience deep spiritual restoration, breakthroughs, and a fresh apostolic anointing. Bring your entire family and community.',
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
  const [events, setEvents] = useState<EventItem[]>(DEFAULT_EVENTS);
  const [, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        const data = await getEvents();
        if (data && data.length > 0) {
          setEvents(data);
        }
      } catch {
        // Fallback default events
      } finally {
        setLoading(false);
      }
    };
    fetchEventsList();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FBF9F5] text-[#171717] font-sans antialiased selection:bg-[#C5A038]/20 selection:text-[#2E1B0A]">
      
      {/* 1. Page Header Banner */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-stone-200/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E7015] block">
              Agenda & Pelayanan Jemaat
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#171717] tracking-tight uppercase">
              Upcoming Events
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed pt-1">
              Geser ke kanan atau kiri untuk menjelajahi seluruh agenda retret, KKR, ibadah perayaan, dan kegerakan rohani jemaat GRI Zion Filadelfia.
            </p>
          </div>

          <div className="self-start md:self-end shrink-0">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 hover:border-[#8E7015] bg-white hover:bg-[#FBF9F5] text-[#2E1B0A] hover:text-[#8E7015] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all no-underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </section>

      {}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Status indicator and swipe hint */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
          <span className="font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8E7015]" />
            Daftar Acara Mendatang
          </span>
          <span className="text-[11px] text-stone-400 flex items-center gap-1 md:hidden">
            <span>Geser ke samping</span>
            <span>→</span>
          </span>
        </div>

        {/* Scroll Container (Snap, Horizontal, No Auto-Scroll, Clean) */}
        <div
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
                className="snap-start shrink-0 w-[85vw] sm:w-[500px] lg:w-[560px] bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {hasImg ? (
                    /* Image Banner */
                    <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-stone-100 shadow-inner group">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#2E1B0A]/85 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15 font-bold text-[#C5A038] text-[11px] shadow">
                          {categoryBadge}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Date Art Banner */
                    <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-br from-[#2E1B0A] via-[#241508] to-[#171717] p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-inner border border-white/5">
                      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#8E7015]/20 rounded-full blur-2xl pointer-events-none" />

                      {/* Top: Category badge */}
                      <div className="flex items-center justify-start text-xs relative z-10 w-full">
                        <span className="bg-white/10 px-3 py-1 rounded-xl border border-white/10 font-bold text-[#C5A038] text-[11px]">
                          {categoryBadge}
                        </span>
                      </div>

                      {/* Center: Month Year + Huge Day Number + Time */}
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

                      {/* Bottom: Location */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-start text-[11px] text-stone-300 relative z-10 w-full">
                        <span className="flex items-center gap-1.5 truncate max-w-full">
                          <span className="text-[#e11d48]">📍</span>
                          <span className="truncate">{ev.location}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Header and description */}
                  <div>
                    <span className="text-[11px] font-bold text-[#8E7015] uppercase tracking-wider block mb-1">
                      {categoryBadge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#171717] leading-tight line-clamp-2">
                      {ev.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed line-clamp-3">
                      {ev.description}
                    </p>
                  </div>

                  {/* Grid details */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="bg-[#FBF9F5] p-2.5 rounded-xl border border-stone-200/80">
                      <span className="text-[10px] font-bold text-stone-500 uppercase block">Jadwal</span>
                      <span className="font-bold text-[#171717] truncate block mt-0.5">
                        {topDate ? `${mainDate} ${topDate.split(' ')[0]}` : mainDate}
                      </span>
                    </div>
                    <div className="bg-[#FBF9F5] p-2.5 rounded-xl border border-stone-200/80">
                      <span className="text-[10px] font-bold text-stone-500 uppercase block">Lokasi</span>
                      <span className="font-bold text-[#171717] truncate block mt-0.5">
                        {ev.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="pt-5 mt-4 border-t border-stone-100">
                  <a
                    href={`https://wa.me/6287882520227?text=Halo%20Sekretariat%20GRI%20Zion%20Filadelfia,%20saya%20ingin%20mendaftar%20/%20bertanya%20mengenai%20acara%20${encodeURIComponent(
                      ev.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#8E7015] hover:bg-[#A98721] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-xs no-underline"
                  >
                    <span>Reserve a Seat (WA)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {}
      <footer className="bg-[#241508] text-stone-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-12 text-center text-xs">
        <p>© 2026 Gereja Rasuli Indonesia Jemaat Zion Filadelfia. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Events;