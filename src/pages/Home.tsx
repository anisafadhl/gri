import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer';
import { getSiteSettings, getEvents } from '../lib/supabase';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

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
        if (!extractedTime.toLowerCase().startsWith('pk') && !extractedTime.toLowerCase().startsWith('pukul') && extractedTime.includes(':')) {
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

export const Home: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isEventPaused, setIsEventPaused] = useState(false);

  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (err) {
        setSettings({
          hero_quote: '"To the angel of the church in Philadelphia write: These are the words of him who is holy and true, who holds the key of David. What he opens no one can shut, and what he shuts no one can open."',
          hero_quote_ref: '— Revelation 3:7',
          about_title: 'ONE BIG FAMILY',
          about_desc_1: "GRI Zion Filadelfia is a Christ-centered spiritual family dedicated to building a loving apostolic community, establishing daily prayer altars, and proclaiming the truth of God's Word across generations.",
          about_desc_2: "We exist to equip every believer into faithful disciples, experiencing total transformation, restoration in the Holy Spirit, and actively bringing God's kingdom values into society."
        });
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await getEvents();
        if (data && data.length > 0) {
          setEvents(data);
          return;
        }
      } catch (err) {
        // Fallback default events
      }

      setEvents([
        {
          id: '1',
          title: '7-Day Sabbath Revival Crusade',
          category: 'Revival Crusade',
          date: 'October 12 – 18, 2026',
          location: 'All Campuses & Live Streaming',
          duration: 'October 12 – 18, 2026',
          description: "A dedicated time to dwell in God's presence, experience deep spiritual restoration, breakthroughs, and a fresh apostolic anointing. Bring your entire family and community.",
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
          time: 'Pk 05.00 WIB & Pk 19.00 WIB'
        },
        {
          id: '2',
          title: 'Ibadah Malam Natal Bersama',
          category: 'Perayaan Khusus',
          date: '24 Desember 2026 • 18:00 WIB',
          location: 'Main Hall – Jemaat Zion Filadelfia',
          duration: '24 Desember 2026 • 18:00 WIB',
          description: 'Mari rayakan momen syahdu kelahiran Juru Selamat bersama seluruh jemaat dan keluarga tercinta. Tersedia jamuan makan malam bersama setelah ibadah selesai.',
          image: '',
          time: '18:00 WIB'
        },
        {
          id: '3',
          title: 'Youth & Congregation Retreat',
          category: 'Fellowship Retreat',
          date: 'December 4 – 6, 2026',
          location: 'Puncak Mountain Resort',
          duration: '3 Days & 2 Nights',
          description: 'Deepening intimacy with Christ through joyful fellowship, prophetic worship encounters, group bonding activities, and empowering biblical workshops.',
          image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80',
          time: 'Puncak, West Java'
        },
        {
          id: '4',
          title: 'Holy Spirit Anointing Night',
          category: 'Annual Assembly',
          date: 'January 15, 2027',
          location: 'ZFM Jakarta & Live Streaming',
          duration: 'Pk 18.30 WIB – Finish',
          description: 'An extraordinary night of high praise, prophetic prayer, and worship welcoming the new season of ministry breakthroughs across all church branches.',
          image: '',
          time: 'Pk 18.30 WIB'
        }
      ]);
    };

    fetchEventsData();
  }, []);

  useEffect(() => {
    if (isEventPaused || events.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isEventPaused, events.length]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevEventSlide = () => {
    setCurrentEventIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const nextEventSlide = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
    setIsEventPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      nextEventSlide();
    } else if (diff < -45) {
      prevEventSlide();
    }
    setIsEventPaused(false);
  };

  if (!settings) return <div className="min-h-screen bg-[#fbf9f5]" />;

  return (
    <div className="w-full font-sans antialiased text-[#171717] bg-[#FBF9F5]">
      {/* 1. Hero Banner (Matched exactly to screenshot) */}
      <section
        id="beranda"
        className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden pt-20 sm:pt-24 md:pt-28"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.60) 0%, rgba(15, 23, 42, 0.85) 100%), url('${settings.hero_image || "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1920&q=80"}')`,
        }}
      >
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 sm:space-y-7 pt-8 sm:pt-12 md:pt-16 pb-20 sm:pb-28">
          
          {/* Main 3-Line Header from screenshot */}
          <h1 
            data-aos="fade-down"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight drop-shadow-xl text-white flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5"
          >
            <span>WELCOME TO GEREJA</span>
            <span>RASULI INDONESIA</span>
            <span className="text-[#C5A038]">JEMAAT ZION FILADELFIA</span>
          </h1>

          {/* Scripture Quotation & Reference */}
          <div data-aos="fade-up" data-aos-delay="200" className="max-w-2xl mx-auto space-y-2 px-2 sm:px-0">
            <p className="text-xs sm:text-sm md:text-base italic font-light text-stone-200 leading-relaxed drop-shadow">
              {settings.hero_quote}
            </p>
            <span className="block font-semibold text-xs sm:text-sm text-[#C5A038] tracking-wider drop-shadow">
              {settings.hero_quote_ref}
            </span>
          </div>

          {/* CTA Buttons: Royal Gold Primary & Frosted Glass Secondary */}
          <div data-aos="zoom-in" data-aos-delay="400" className="flex flex-wrap justify-center items-center gap-4 pt-3">
            <button
              onClick={scrollToAbout}
              className="px-8 py-3.5 sm:px-9 sm:py-4 border border-white/80 hover:border-[#C5A038] text-white hover:text-white font-bold text-sm tracking-wide rounded-2xl bg-black/25 hover:bg-white/15 transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer min-w-[150px] hover:-translate-y-0.5 active:translate-y-0"
            >
              Discover More
            </button>
            <Link
              to="/connect"
              className="px-8 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-[#8E7015] to-[#A98721] hover:from-[#A98721] hover:to-[#C5A038] text-white font-bold text-sm tracking-wide rounded-2xl border border-[#C5A038]/50 shadow-md hover:shadow-lg hover:shadow-[#C5A038]/25 transition-all duration-300 text-center no-underline min-w-[150px] hover:-translate-y-0.5 active:translate-y-0"
            >
              Join Us!
            </Link>
          </div>

        </div>
      </section>

      {/* 2. About Us: ONE BIG FAMILY + Bento Visi, Misi, DNA */}
      <section id="about" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Top Grid */}
        <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#171717] tracking-tight leading-tight sm:leading-none whitespace-pre-line">
              {settings.about_title ? settings.about_title.replace(' ', '\n') : 'ONE BIG\nFAMILY'}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#8E7015] mt-4 sm:mt-6 rounded-full"></div>
          </div>
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
            <p>{settings.about_desc_1}</p>
            <p>{settings.about_desc_2}</p>
          </div>
        </div>

        {/* Bento Grid Architecture */}
        <div className="mt-10 sm:mt-16 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Visi */}
            <div data-aos="fade-right" className="lg:col-span-5 bg-gradient-to-br from-[#2E1B0A] via-[#241508] to-[#171717] text-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[32px] border border-[#8E7015]/30 shadow-xl flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#8E7015]/25 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-5 sm:space-y-6 relative z-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Visi Gereja
                  </h3>
                  <p className="text-xs text-stone-300 font-light mt-1 leading-relaxed">
                    Panggilan ilahi yang menjadi arah dan tujuan utama pergerakan jemaat.
                  </p>
                  <div className="w-10 sm:w-12 h-1 bg-[#C5A038] mt-2.5 rounded-full"></div>
                </div>

                <div className="space-y-3 pt-1">
                  {[
                    { title: 'Pemulihan Keluarga', desc: 'Membangun mezbah doa dan menegakkan pemulihan ilahi dalam setiap rumah tangga jemaat.' },
                    { title: 'Pertobatan Banyak Jiwa Baru', desc: 'Mengobarkan api penginjilan untuk menjangkau jiwa-jiwa terhilang bagi keselamatan kekal.' },
                    { title: 'Mempersiapkan Umat yang Layak bagi Tuhan', desc: 'Membentuk karakter jemaat yang kudus, dewasa secara rohani, dan siap menyambut kedatangan Kristus.' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A038]/50 hover:bg-white/10 transition-all flex items-start gap-3.5 group/item">
                      <span className="w-7 h-7 rounded-lg bg-[#C5A038]/20 border border-[#C5A038]/40 text-[#C5A038] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-100 group-hover/item:text-[#C5A038] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-stone-300/80 mt-1 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Misi */}
            <div data-aos="fade-left" data-aos-delay="200" className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[32px] border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-center">
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                    Misi Pelayanan
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 mt-1 font-medium">
                    Langkah nyata memperlengkapi jemaat dan melayani sesama
                  </p>
                  <div className="w-10 sm:w-12 h-1 bg-[#8E7015] mt-2 rounded-full"></div>
                </div>

                <div className="space-y-2 sm:space-y-2.5 pt-1">
                  {[
                    'Penuh dengan Roh dan Kuasa',
                    'Berpegang teguh pada kebenaran yang alkitabiah',
                    'Melahirkan, mengajar, melatih, memperlengkapi, dan mengutus murid-murid Kristus ke seluruh dunia',
                    'Menjaga kesatuan hati, Roh, Iman, Pikiran, Tujuan sesuai Firman',
                    'Melayani atas dasar kasih, kesetiaan, pengorbanan, ketaatan & kerendahan hati'
                  ].map((text, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-stone-200/80 hover:border-[#8E7015]/40 transition-colors flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-[#2E1B0A] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-medium">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DNA Zion Filadelfia Card */}
          <div data-aos="fade-up" data-aos-delay="100" className="w-full bg-gradient-to-br from-[#2E1B0A] via-[#241508] to-[#190f05] rounded-2xl sm:rounded-[32px] p-6 sm:p-8 lg:p-10 text-white border border-[#8E7015]/30 shadow-xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#8E7015]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#8E7015]/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mb-6 sm:mb-8 space-y-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                DNA Zion Filadelfia
              </h3>
              <div className="w-12 h-1 bg-[#C5A038] rounded-full"></div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light pt-1">
                Karakter rasuli yang mendarah daging dalam setiap pribadi jemaat, pengerja, dan pelayan Tuhan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              {[
                { num: 1, title: 'Worshiper', desc: 'Gaya hidup penyembahan sejati dalam Roh & Kebenaran.' },
                { num: 2, title: 'Deklarasi Firman', desc: 'Memperkatakan otoritas Firman dengan iman teguh.' },
                { num: 3, title: 'Pengajaran Alkitabiah', desc: 'Doktrin yang murni dan tidak berkompromi dengan dunia.' },
                { num: 4, title: 'Penuh Karunia Roh', desc: 'Dipimpin Roh Kudus dan aktif dalam kuasa mukjizat.' },
                { num: 5, title: 'Missioner', desc: 'Berdampak nyata dan berjiwa menginjil ke banyak jiwa.' },
                { num: 6, title: 'Hati Hamba', desc: 'Melayani tulus dengan rendah hati dan ketaatan.' },
              ].map((item, idx) => (
                <div
                  key={item.num}
                  data-aos="zoom-in"
                  data-aos-delay={idx * 50}
                  className="group/card bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A038]/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between backdrop-blur-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="w-6 h-6 rounded-lg bg-[#C5A038]/20 border border-[#C5A038]/40 text-[#C5A038] text-xs font-bold font-mono flex items-center justify-center">
                        {item.num}
                      </span>
                      <div className="w-6 h-0.5 bg-[#C5A038]/40 group-hover/card:bg-[#C5A038] group-hover/card:w-10 transition-all rounded-full"></div>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover/card:text-[#C5A038] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-stone-300/85 mt-1.5 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* 7. Kasih Persaudaraan (Spans 2 columns) */}
              <div data-aos="zoom-in" data-aos-delay="300" className="sm:col-span-2 lg:col-span-2 group/card bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A038]/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between backdrop-blur-xs">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#C5A038]/20 border border-[#C5A038]/40 text-[#C5A038] text-xs font-bold font-mono flex items-center justify-center">
                      7
                    </span>
                    <div className="w-6 h-0.5 bg-[#C5A038]/40 group-hover/card:bg-[#C5A038] group-hover/card:w-10 transition-all rounded-full"></div>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover/card:text-[#C5A038] transition-colors">
                    Kasih Persaudaraan
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-300/85 mt-1.5 leading-relaxed font-light">
                    Pondasi pengikat kesatuan tubuh Kristus yang saling menopang dan mengasihi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Latest Sermon Section */}
      <section
        id="sermon"
        className="pt-8 pb-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 50%, #f4efe6 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#171717] mb-4">
            Latest Sermon
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base mb-10">
            Listen to the empowering message of God's Word that strengthens faith, brings healing to the heart, and guides your daily walk with Christ.
          </p>

          <VideoPlayer videoId={settings.sermon_youtube_id} title="GRI Latest Sermon" />

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-neutral-700">
            <div>
              <span>Watch our latest message by </span>
              <strong className="font-bold text-neutral-900">
                {settings.sermon_speaker || 'Ps. Besron Jusup Roni Marpaung'}
              </strong>
            </div>

            <a
              href="https://www.youtube.com/@bjrbesronjusuproni"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[#8E7015] hover:text-[#C5A038] transition-colors group no-underline"
            >
              <span>Visit YouTube Channel</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {}
      {/* 4. Upcoming Events Carousel Section (Refined: Minimalist Oval Button + No Slide Numbers) */}
      <section id="events" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-200/60">
        <div className="w-full">
          {/* Section Header: Titles on Left & Clean Actions on Right */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight uppercase">
                Upcoming Events
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-xl">
                Experience powerful moments of worship, spiritual retreat, and fellowship. Join our upcoming gatherings.
              </p>
            </div>

            {/* Desktop Action Bar: Minimalist Oval Button (Desktop Only) + Navigation Arrows */}
            <div className="hidden md:flex items-center justify-end gap-3 self-end">
              <Link
                to="/events"
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-stone-200 hover:border-[#8E7015] bg-white hover:bg-[#FBF9F5] text-[#2E1B0A] hover:text-[#8E7015] text-xs font-semibold tracking-wide shadow-2xs hover:shadow-xs transition-all active:scale-95 no-underline"
              >
                <span>Lihat Semua Event</span>
              </Link>

              {/* Desktop Slider Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevEventSlide}
                  type="button"
                  aria-label="Previous event"
                  className="w-10 h-10 rounded-2xl bg-white border border-stone-200 text-[#171717] hover:bg-[#8E7015] hover:text-white hover:border-[#8E7015] flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextEventSlide}
                  type="button"
                  aria-label="Next event"
                  className="w-10 h-10 rounded-2xl bg-white border border-stone-200 text-[#171717] hover:bg-[#8E7015] hover:text-white hover:border-[#8E7015] flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Large Carousel Track (Auto-play + Touch Swipe) */}
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px]"
            onMouseEnter={() => setIsEventPaused(true)}
            onMouseLeave={() => setIsEventPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}
            >
              {events.map((ev, index) => {
                const hasImg = Boolean(ev.image && ev.image.trim() !== '' && ev.image !== '/event.png');
                const { topDate, mainDate } = parseEventDate(ev.date, ev.time, ev.duration);
                const leftBadge = (ev.category || 'Special Event').split('•')[0].trim();

                let fontSizeClass = 'text-7xl sm:text-8xl lg:text-9xl';
                if (mainDate.length > 2 && mainDate.length <= 8) {
                  fontSizeClass = 'text-5xl sm:text-6xl lg:text-7xl';
                } else if (mainDate.length > 8) {
                  fontSizeClass = 'text-3xl sm:text-4xl lg:text-5xl';
                }

                return (
                  <div key={ev.id || index} className="w-full shrink-0">
                    <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[36px] border border-stone-200 p-5 sm:p-8 lg:p-12 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden text-left">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                        
                        {/* SISI KIRI: Visual Banner */}
                        <div className="lg:col-span-6 w-full">
                          {hasImg ? (
                            /* Tampilan Card Bergambar: Tanpa pill tag (dibuat bersih) */
                            <div className="relative w-full h-64 sm:h-80 lg:h-[420px] rounded-xl sm:rounded-[28px] overflow-hidden bg-stone-100 shadow-inner group">
                              <img
                                src={ev.image}
                                alt={ev.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                          ) : (
                            /* Tampilan Card Tanpa Gambar (Date Art): Bulan Tahun di atas angka, Lokasi di kanan bawah */
                            <div className="w-full h-64 sm:h-80 lg:h-[420px] rounded-xl sm:rounded-[28px] bg-gradient-to-br from-[#2E1B0A] via-[#241508] to-[#171717] p-5 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-xl border border-white/5">
                              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#8E7015]/25 rounded-full blur-3xl pointer-events-none"></div>

                              {/* Kiri Atas: Pill Kategori (Kanan Atas Dikosongkan) */}
                              <div className="flex items-center justify-start text-xs relative z-10 w-full">
                                <span className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 font-bold text-[#C5A038] text-[11px] sm:text-xs">
                                  {leftBadge}
                                </span>
                              </div>

                              {/* Tengah: Bulan Tahun + Angka Tanggal + Jam */}
                              <div className="space-y-1 my-auto text-center relative z-10 py-2 w-full">
                                {topDate && (
                                  <span className="text-xs sm:text-sm font-bold tracking-widest text-[#C5A038] uppercase block mb-1">
                                    {topDate}
                                  </span>
                                )}
                                <span className={`${fontSizeClass} font-black text-white tracking-tight block leading-none py-1 drop-shadow`}>
                                  {mainDate}
                                </span>
                                <span className="text-xs sm:text-sm text-stone-300 font-light block pt-1">
                                  {ev.time || 'Pk 18.00 WIB'}
                                </span>
                              </div>

                              {/* Kiri Bawah: Lokasi */}
                              <div className="pt-4 border-t border-white/10 flex items-center justify-start text-xs text-stone-300 relative z-10 w-full">
                                <span className="flex items-center gap-1.5 truncate max-w-full">
                                  <span className="text-[#e11d48]">📍</span>
                                  <span className="truncate">{ev.location}</span>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* SISI KANAN: Detail Informasi Acara */}
                        <div className="lg:col-span-6 flex flex-col justify-between space-y-5 sm:space-y-6">
                          <div className="space-y-3 sm:space-y-4">
                            <span className="inline-block text-xs font-bold text-[#8E7015] uppercase tracking-wider">
                              {leftBadge}
                            </span>

                            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] leading-tight">
                              {ev.title}
                            </h3>

                            <p className="text-stone-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                              {ev.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
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
                                  <span className="text-[11px] font-semibold text-[#8E7015] block truncate mt-0.5">
                                    {ev.time || ev.duration || 'Pk 18.00 WIB'}
                                  </span>
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

                          <div className="flex flex-wrap items-center gap-3 pt-1">
                            <a
                              href={`https://wa.me/6287882520227?text=Halo,%20saya%20ingin%20mendaftar%20/%20bertanya%20mengenai%20acara%20${encodeURIComponent(
                                ev.title
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-[#8E7015] hover:bg-[#A98721] text-white text-xs sm:text-sm font-bold shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer no-underline"
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

          {/* Pagination Dots (Khusus Desktop Saja) */}
          <div data-aos="fade-up" className="hidden md:flex justify-center items-center gap-2 mt-8">
            {events.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentEventIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer focus:outline-none ${
                  currentEventIndex === index
                    ? 'w-10 bg-[#8E7015]'
                    : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

          {/* Mobile Only: Bottom Oval Button "Lihat Semua Event" */}
          <div data-aos="fade-up" className="mt-6 flex justify-center md:hidden">
            <Link
              to="/events"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-stone-200 hover:border-[#8E7015] bg-white hover:bg-[#FBF9F5] text-[#2E1B0A] hover:text-[#8E7015] text-xs font-semibold tracking-wide shadow-2xs active:scale-95 no-underline"
            >
              <span>Lihat Semua Event</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Campuses Section */}
      <section id="campuses" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200/60">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <div data-aos="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#171717]">
              OUR CAMPUSES
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Gereja Rasuli Indonesia hadir di berbagai cabang untuk melayani, menjangkau, dan bertumbuh bersama dalam kasih Kristus.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {[
              {
                title: 'ZFM Jakarta',
                tag: 'Jakarta Barat',
                service: 'Sunday Service: Pk 07.00 WIB',
                address: 'Ruko Mutiara Taman Palem Blok B10 No. 20, Jl. Taman Mutiara Palem, Cengkareng, Jakarta Barat 11730'
              },
              {
                title: 'ZFM Bekasi',
                tag: 'Kota Bekasi',
                service: 'Sunday Service: Pk 07.00 WIB',
                address: 'Ruko Grand Centre, Jl. Cut Mutia 1 Blok A15, RT 001/RW/011, Margahayu, Kota Bekasi 17112'
              },
              {
                title: 'ZFM Bandung',
                tag: 'Bandung Barat',
                service: 'Sunday Service: Pk 07.00 WIB',
                address: 'Ruko Bisnis Park, Jl. Raya Taman Kopo Indah 2 No. 21, Rahayu, Kab. Bandung Barat 40216'
              },
              {
                title: 'ZFM Toraja',
                tag: 'Toraja Utara',
                service: 'Sunday Service: Pk 08.00 WITA',
                address: 'Toko Paolo Cell, Jl. Poros Kete Kesu, Rinding Batu, Kec. Kesu, Kab. Toraja Utara 91831'
              }
            ].map((c, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-[#FBF9F5] p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-8"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-[260px] lg:min-w-[300px]">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-2xs text-[#8E7015]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-bold text-[#171717] leading-tight tracking-tight">
                        {c.title}
                      </h3>
                      <span className="text-[11px] font-medium px-3 py-0.5 bg-stone-200/60 text-stone-600 rounded-full">
                        {c.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8E7015] mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8E7015] inline-block shrink-0"></span>
                      <span>{c.service}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
                  <p>{c.address}</p>
                </div>

                <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0 flex justify-end">
                  <Link
                    to="/campuses"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-stone-200 hover:border-[#8E7015] hover:text-[#8E7015] text-[#171717] text-xs font-bold rounded-xl transition-all duration-200 shadow-2xs group no-underline"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery Preview Section */}
      <section id="gallery" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FBF9F5]">
        <div data-aos="fade-up" className="max-w-6xl mx-auto space-y-10 sm:space-y-12 text-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#171717]">
              OUR GALLERY
            </h2>
            <p className="mt-3 text-stone-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
              Kumpulan momen-momen indah kebersamaan jemaat Gereja Rasuli Indonesia dalam berbagai kegiatan dan ibadah.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              to="/gallery"
              className="px-8 py-3.5 sm:py-4 bg-white border border-stone-200 hover:border-[#8E7015] hover:text-[#8E7015] text-[#171717] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-colors shadow-2xs hover:shadow-xs no-underline inline-block"
            >
              Lihat Galeri Selengkapnya
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};