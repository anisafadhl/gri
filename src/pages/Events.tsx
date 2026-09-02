import React, { useEffect, useState } from 'react';
import { EventCarousel } from '../components/EventCarousel';
import { getEvents } from '../lib/supabase';
import { Calendar, MapPin, Clock } from 'lucide-react';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEventsList = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEventsList();
  }, []);

  return (
    <div className="w-full">
      {/* Banner */}
      <section
        className="h-[45vh] min-h-[320px] flex flex-col justify-center items-center text-center text-white px-[5%] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.6)), url('/Gereja Rasuli Indonesia Jemaat Zion Filadelfia.png')`,
        }}
      >
        <h1 data-aos="fade-down" className="text-4xl md:text-5xl font-bold uppercase tracking-wider drop-shadow-md">
          Upcoming Events
        </h1>
        <p data-aos="fade-up" data-aos-delay="200" className="mt-3 text-neutral-200 max-w-xl text-base drop-shadow">
          Jadwal kegiatan, seminar rohani, dan perayaan ibadah khusus Gereja Rasuli Indonesia.
        </p>
      </section>

      {/* Featured Carousel Section */}
      <section className="py-20 px-[5%] bg-[#faf8f5] border-b border-neutral-200/60">
        <div className="max-w-6xl mx-auto space-y-10">
          <div data-aos="fade-up" className="text-center">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              Featured Event
            </span>
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide text-neutral-900">
              Sorotan Agenda Terkini
            </h2>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <EventCarousel />
          </div>
        </div>
      </section>

      {/* All Events List */}
      <section className="py-24 px-[5%] max-w-6xl mx-auto bg-white">
        <h2 data-aos="fade-up" className="text-2xl md:text-3xl font-bold text-center text-neutral-900 mb-16 uppercase tracking-wide">
          Semua Agenda Kegiatan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.length > 0 ? (
            events.map((e, index) => {
              // Extract time from date string if present
              let dateStr = e.date || '';
              let timeStr = e.time || e.duration || '';
              
              if (dateStr.includes('•')) {
                const parts = dateStr.split('•');
                dateStr = parts[0].trim();
                if (!timeStr) timeStr = parts[1].trim();
              } else if (dateStr.includes('Pk')) {
                const parts = dateStr.split('Pk');
                dateStr = parts[0].trim();
                if (!timeStr) timeStr = `Pk ${parts[1].trim()}`;
              }

              return (
                <div
                  key={e.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-[#faf8f5] p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-bold px-3 py-1.5 bg-white text-neutral-800 rounded-full border border-neutral-200/80 shadow-2xs">
                        {e.category?.split('•')[0]?.trim() || e.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-[#8E7015] transition-colors leading-tight">
                      {e.title}
                    </h3>
                    
                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                      {e.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-200/80 space-y-3">
                    <div className="flex items-center gap-3 text-neutral-700">
                      <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-[#8E7015]" />
                      </div>
                      <span className="text-sm font-semibold">{dateStr}</span>
                    </div>
                    
                    {timeStr && (
                      <div className="flex items-center gap-3 text-neutral-700">
                        <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-[#8E7015]" />
                        </div>
                        <span className="text-sm font-semibold">{timeStr}</span>
                      </div>
                    )}

                    {e.location && (
                      <div className="flex items-center gap-3 text-neutral-700">
                        <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-[#8E7015]" />
                        </div>
                        <span className="text-sm font-medium line-clamp-1">{e.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-neutral-500 col-span-1 md:col-span-2 text-center py-10">Memuat daftar agenda...</p>
          )}
        </div>
      </section>
    </div>
  );
};
