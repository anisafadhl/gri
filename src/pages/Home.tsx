import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer';
import { EventCarousel } from '../components/EventCarousel';
import { getSiteSettings } from '../lib/supabase';
import { MapPin, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const campuses = [
    {
      name: 'Jemaat Zion Filadelfia',
      badge: 'Main Campus',
      location: 'Jakarta Pusat',
      description:
        'Pusat peribadatan utama dengan jangkauan pelayanan yang komprehensif, pembinaan keluarga rohani, dan pusat Mezbah Doa Pagi.',
    },
    {
      name: 'Jemaat Agape',
      badge: 'Community & Outreach',
      location: 'Jakarta Barat',
      description:
        'Fokus pada perintisan misi sosial, pelayanan anak-anak, dan pemberdayaan masyarakat di wilayah perkotaan dan sekitarnya.',
    },
    {
      name: 'Jemaat Bethel',
      badge: 'Youth & College',
      location: 'Jakarta Selatan',
      description:
        'Menjadi rumah ibadah yang ramah, hangat, dan dinamis bagi para mahasiswa, profesional muda, dan perantau.',
    },
  ];

  if (!settings) return <div className="min-h-screen bg-[#fbf9f5]" />; // simple loading state

  return (
    <div className="w-full">
      {/* 1. Hero Banner with Clean Warm Overlay */}
      <section
        id="beranda"
        className="relative min-h-screen flex flex-col justify-center items-center text-center text-white px-[5%] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.55)), url('${settings.hero_image || "/Gereja Rasuli Indonesia Jemaat Zion Filadelfia.png"}')`,
        }}
      >
        <div className="max-w-4xl mx-auto space-y-6 pt-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight drop-shadow-lg">
            {settings.hero_title}
            <br />
            <span className="text-gold-light">{settings.hero_subtitle}</span>
          </h1>

          <div className="max-w-2xl mx-auto space-y-3">
            <p className="text-base md:text-lg italic font-light opacity-95 leading-relaxed text-neutral-100 drop-shadow">
              {settings.hero_quote}
            </p>
            <span className="block font-semibold text-sm md:text-base text-gold-light drop-shadow">
              {settings.hero_quote_ref}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={scrollToAbout}
              className="px-8 py-3.5 border border-white text-white font-medium tracking-wider rounded-sm hover:bg-white hover:text-neutral-900 transition-all duration-300 shadow-md backdrop-blur-xs"
            >
              Discover More
            </button>
            <Link
              to="/connect"
              className="px-8 py-3.5 bg-white text-neutral-900 font-semibold tracking-wider rounded-sm hover:bg-neutral-100 transition-all duration-300 shadow-md no-underline"
            >
              Join Us!
            </Link>
          </div>
        </div>
      </section>

      {/* 2. About Us: ONE BIG FAMILY + Visi Misi */}
      <section id="about" className="py-24 px-[5%] bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-neutral-900 tracking-tight leading-none whitespace-pre-line">
                {settings.about_title.replace(' ', '\n')}
              </h2>
            </div>
            <div className="space-y-4 text-neutral-600 font-sans leading-relaxed text-base md:text-lg">
              <p>{settings.about_desc_1}</p>
              <p>{settings.about_desc_2}</p>
            </div>
          </div>

          {/* Visi & Misi Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#faf8f5] p-8 rounded-lg border-l-4 border-gold shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-neutral-100/80">
              <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
                Visi
              </span>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {settings.visi_title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                {settings.visi_desc}
              </p>
            </div>

            <div className="bg-[#faf8f5] p-8 rounded-lg border-l-4 border-gold shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-neutral-100/80">
              <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
                Misi
              </span>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {settings.misi_title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                {settings.misi_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Latest Sermon Section */}
      <section
        id="sermon"
        className="pt-8 pb-20 px-[5%]"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 50%, #f4efe6 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
            Pemberitaan Firman
          </span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-gold mb-10">
            {settings.sermon_title}
          </h2>

          <VideoPlayer videoId={settings.sermon_youtube_id} title={settings.sermon_title} />
        </div>
      </section>

      {/* 4. Upcoming Events Carousel Section */}
      <section id="events-carousel" className="py-24 px-[5%] bg-[#fbf9f5] border-t border-neutral-200/60">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div>
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              Jadwal & Agenda
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-neutral-900">
              UPCOMING EVENTS
            </h2>
            <p className="mt-3 text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
              Ikuti berbagai kegiatan, seminar rohani, dan perayaan ibadah khusus bersama keluarga besar GRI.
            </p>
          </div>

          <EventCarousel />
        </div>
      </section>

      {/* 5. Campuses Section */}
      <section id="campuses" className="py-24 px-[5%] bg-white border-t border-neutral-200/60">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              Lokasi & Komunitas Jemaat
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-neutral-900">
              OUR CAMPUSES
            </h2>
            <p className="mt-3 text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
              Gereja Rasuli Indonesia hadir di berbagai cabang untuk melayani, menjangkau, dan bertumbuh bersama dalam kasih Kristus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campuses.map((c, i) => (
              <div
                key={i}
                className="bg-[#faf8f5] p-8 rounded-xl border border-neutral-200/70 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">
                      {c.badge}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{c.location}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{c.name}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">{c.description}</p>
                </div>

                <Link
                  to="/campuses"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light uppercase tracking-wider no-underline transition-colors group"
                >
                  <span>Info Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
