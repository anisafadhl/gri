import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { getEvents } from '../lib/supabase';

export interface EventItem {
  id: string;
  date: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  time?: string;
  duration?: string;
  status?: string;
}

/**
 * Smart Date Parser
 * Handles:
 * - "24 Desember 2026 • 18:00 WIB" (Indonesian date format with embedded time)
 * - "24 Desember 2026" / "12 – 18 Oktober 2026" (Day-first Indonesian format)
 * - "January 15, 2027" / "October 12 – 18, 2026" (Month-first English format)
 * - "2026-12-24" (ISO format)
 */
function parseEventDate(dateStr: string, timeProp?: string, durationProp?: string) {
  if (!dateStr) {
    return { topDate: '', mainDate: '—', timeText: timeProp || durationProp || '' };
  }

  let cleanDate = dateStr.trim();
  let extractedTime = timeProp || durationProp || '';

  // Extract embedded time if attached via separators
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

  // Indonesian Format: Day/Range first (e.g., "24 Desember 2026", "12 – 18 Oktober 2026")
  const dayFirstMatch = cleanDate.match(/^([0-9\s\-\–]+)\s+([a-zA-Z]+)(?:[,\s]+([0-9]{4}))?/);
  if (dayFirstMatch) {
    const day = dayFirstMatch[1].trim();
    const month = dayFirstMatch[2].trim();
    const year = dayFirstMatch[3] || '';
    return {
      topDate: year ? `${month} ${year}`.toUpperCase() : month.toUpperCase(),
      mainDate: day,
      timeText: extractedTime || 'Pk 18.30 WIB',
    };
  }

  // English Format: Month first (e.g., "January 15, 2027", "October 12 – 18, 2026")
  const monthFirstMatch = cleanDate.match(/^([a-zA-Z]+)\s+([0-9\s\-\–]+)(?:[,\s]+([0-9]{4}))?/);
  if (monthFirstMatch) {
    const month = monthFirstMatch[1].trim();
    const day = monthFirstMatch[2].trim();
    const year = monthFirstMatch[3] || '';
    return {
      topDate: year ? `${month} ${year}`.toUpperCase() : month.toUpperCase(),
      mainDate: day,
      timeText: extractedTime || 'Pk 18.30 WIB',
    };
  }

  // ISO Format (e.g., "2026-12-24")
  const isoMatch = cleanDate.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);
  if (isoMatch) {
    const year = isoMatch[1];
    const monthIndex = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10).toString();
    const monthNames = [
      'JANUARI',
      'FEBRUARI',
      'MARET',
      'APRIL',
      'MEI',
      'JUNI',
      'JULI',
      'AGUSTUS',
      'SEPTEMBER',
      'OKTOBER',
      'NOVEMBER',
      'DESEMBER',
    ];
    return {
      topDate: `${monthNames[monthIndex] || ''} ${year}`.trim(),
      mainDate: day,
      timeText: extractedTime || 'Pk 18.30 WIB',
    };
  }

  return {
    topDate: '',
    mainDate: cleanDate,
    timeText: extractedTime || '',
  };
}

const DEFAULT_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Ibadah Malam Natal Bersama',
    category: 'Perayaan Khusus • Season of Joy',
    date: '24 Desember 2026 • 18:00 WIB',
    location: 'Main Hall – Jemaat Zion Filadelfia',
    duration: '18:00 WIB – Selesai',
    description:
      'Mari rayakan momen syahdu kelahiran Juru Selamat bersama seluruh jemaat dan keluarga tercinta. Tersedia jamuan makan malam bersama setelah ibadah selesai.',
    image: '',
    time: '18:00 WIB',
    status: 'Open for Public',
  },
  {
    id: '2',
    title: '7-Day Sabbath Revival Crusade',
    category: 'Annual Spiritual Revival • All Generations',
    date: 'October 12 – 18, 2026',
    location: 'All Campuses & Live Streaming',
    duration: '7 Full Days',
    description:
      "A dedicated time to dwell in God's presence, experience deep spiritual restoration, breakthroughs, and a fresh apostolic anointing. Bring your entire family and community.",
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    time: 'Pk 05.00 WIB & Pk 19.00 WIB',
    status: 'Open for Public',
  },
  {
    id: '3',
    title: 'Holy Spirit Anointing Night',
    category: 'Annual Assembly • New Year Season',
    date: 'January 15, 2027',
    location: 'ZFM Jakarta & Live Streaming',
    duration: 'Pk 18.30 WIB',
    description:
      'An extraordinary night of high praise, prophetic prayer, and worship welcoming the new season of ministry breakthroughs across all church branches.',
    image: '',
    time: 'Pk 18.30 WIB',
    status: 'Open for Public',
  },
];

export const EventCarousel: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await getEvents();
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(DEFAULT_EVENTS);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(DEFAULT_EVENTS);
      }
    };
    
    fetchEventsData();
  }, []);

  // 5-second automatic sliding timer with pause on hover
  useEffect(() => {
    if (isPaused || events.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, events.length]);

  if (events.length === 0) {
    return (
      <div className="min-h-[460px] flex items-center justify-center text-stone-500 font-sans">
        Memuat agenda acara...
      </div>
    );
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  return (
    <div className="w-full font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight uppercase">
            Upcoming Events
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-xl">
            Experience powerful moments of worship, spiritual retreat, and fellowship. Join our upcoming gatherings.
          </p>
        </div>

        {/* Counter & Arrow Buttons */}
        <div className="flex items-center gap-4 self-start md:self-end">
          <div className="text-xs font-semibold text-stone-500 font-mono">
            <span className="text-[#8E7015] font-bold text-sm">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-stone-300 mx-1">/</span>
            <span>{String(events.length).padStart(2, '0')}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              type="button"
              aria-label="Previous event"
              className="w-11 h-11 rounded-2xl bg-white border border-stone-200 text-[#171717] hover:bg-[#8E7015] hover:text-white hover:border-[#8E7015] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              type="button"
              aria-label="Next event"
              className="w-11 h-11 rounded-2xl bg-white border border-stone-200 text-[#171717] hover:bg-[#8E7015] hover:text-white hover:border-[#8E7015] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Track Carousel Slider */}
      <div
        className="relative overflow-hidden rounded-3xl sm:rounded-[36px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {events.map((ev, index) => {
            const hasImg = Boolean(ev.image && ev.image.trim() !== '' && ev.image !== '/event.png');
            const { topDate, mainDate, timeText } = parseEventDate(ev.date, ev.time, ev.duration);

            const categoryParts = (ev.category || '').split('•');
            const leftBadge = categoryParts[0]?.trim() || 'Perayaan Khusus';

            let fontSizeClass = 'text-7xl sm:text-8xl lg:text-9xl';
            if (mainDate.length > 2 && mainDate.length <= 8) {
              fontSizeClass = 'text-5xl sm:text-6xl lg:text-7xl';
            } else if (mainDate.length > 8) {
              fontSizeClass = 'text-3xl sm:text-4xl lg:text-5xl';
            }

            return (
              <div key={ev.id || index} className="w-full shrink-0">
                <div className="bg-white rounded-3xl sm:rounded-[36px] border border-stone-200 p-6 sm:p-8 lg:p-12 shadow-xs hover:shadow-md hover:border-[#8E7015]/40 transition-all duration-300 overflow-hidden text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Visual Banner (Photo Banner or Date Art Banner) */}
                    <div className="lg:col-span-6 w-full">
                      {hasImg ? (
                        <div className="relative w-full h-72 sm:h-80 lg:h-[420px] rounded-2xl sm:rounded-[28px] overflow-hidden bg-stone-100 shadow-inner group">
                          <img
                            src={ev.image}
                            alt={ev.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                      ) : (
                        <div className="w-full h-72 sm:h-80 lg:h-[420px] rounded-2xl sm:rounded-[28px] bg-gradient-to-br from-[#2E1B0A] via-[#241508] to-[#171717] p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-xl border border-white/5">
                          {/* Ambient Gold Glow */}
                          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#8E7015]/25 rounded-full blur-3xl pointer-events-none" />

                          {/* Top Header: Tag di Kiri Atas (Kanan Atas Dihilangkan) */}
                          <div className="flex items-center justify-start text-xs relative z-10 w-full">
                            <span className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 font-bold text-[#A98721] text-[11px] sm:text-xs">
                              {leftBadge}
                            </span>
                          </div>

                          {/* Center Date Typography: Bulan & Tahun (Kembali Semula), Angka Hari Raksasa, dan Jam */}
                          <div className="space-y-1 my-auto text-center relative z-10 py-2 w-full">
                            {topDate && (
                              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#A98721] uppercase block mb-1">
                                {topDate}
                              </span>
                            )}
                            <span
                              className={`${fontSizeClass} font-black text-white tracking-tight block leading-none py-1 drop-shadow`}
                            >
                              {mainDate}
                            </span>
                            {timeText && (
                              <span className="text-xs sm:text-sm text-stone-300 font-light block pt-1">
                                {timeText}
                              </span>
                            )}
                          </div>

                          {/* Footer Info: Lokasi di Kiri Bawah */}
                          <div className="pt-4 border-t border-white/10 flex items-center justify-start text-xs text-stone-300 relative z-10 w-full">
                            <span className="flex items-center gap-1.5 truncate max-w-full">
                              <span className="text-[#e11d48]">📍</span>
                              <span className="truncate">{ev.location}</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Details Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <span className="inline-block text-xs font-bold text-[#8E7015] uppercase tracking-wider">
                          {ev.category?.split('•')[0]?.trim() || 'Perayaan Khusus'}
                        </span>

                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] leading-tight">
                          {ev.title}
                        </h3>

                        <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                          {ev.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="bg-[#FBF9F5] p-3.5 rounded-2xl border border-stone-200/80 flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                              <Calendar className="w-5 h-5 text-[#8E7015]" />
                            </div>
                            <div className="overflow-hidden">
                              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                                Schedule
                              </span>
                              <span className="text-[13px] font-bold text-[#171717] block truncate">
                                {topDate ? `${mainDate} ${topDate}` : mainDate}
                              </span>
                              {(timeText || ev.duration) && (
                                <span className="text-[11px] font-semibold text-[#8E7015] block truncate mt-0.5">
                                  {timeText || ev.duration}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="bg-[#FBF9F5] p-3.5 rounded-2xl border border-stone-200/80 flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                              <MapPin className="w-5 h-5 text-[#8E7015]" />
                            </div>
                            <div className="overflow-hidden">
                              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                                Location
                              </span>
                              <span className="text-[13px] font-bold text-[#171717] block line-clamp-2 leading-tight pr-1">
                                {ev.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href={`https://wa.me/6287882520227?text=Halo,%20saya%20ingin%20mendaftar%20/%20bertanya%20mengenai%20acara%20${encodeURIComponent(
                            ev.title
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-7 py-3.5 rounded-xl bg-[#8E7015] hover:bg-[#A98721] text-white text-xs sm:text-sm font-bold shadow-md transition-all inline-flex items-center gap-2 no-underline hover:scale-[1.02] cursor-pointer"
                        >
                          <span>Reserve a Seat</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {events.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer focus:outline-none ${
              currentIndex === index
                ? 'w-8 bg-[#8E7015]'
                : 'w-2.5 bg-stone-300 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;