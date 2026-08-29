import React, { useEffect, useState } from 'react';
import { EventCarousel } from '../components/EventCarousel';
import { getEvents } from '../lib/supabase';

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
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider drop-shadow-md">
          Upcoming Events
        </h1>
        <p className="mt-3 text-neutral-200 max-w-xl text-base drop-shadow">
          Jadwal kegiatan, seminar rohani, dan perayaan ibadah khusus Gereja Rasuli Indonesia.
        </p>
      </section>

      {/* Featured Carousel Section */}
      <section className="py-20 px-[5%] bg-[#faf8f5] border-b border-neutral-200/60">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">
              Featured Event
            </span>
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide text-neutral-900">
              Sorotan Agenda Terkini
            </h2>
          </div>

          <EventCarousel />
        </div>
      </section>

      {/* All Events List */}
      <section className="py-24 px-[5%] max-w-6xl mx-auto bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 mb-16 uppercase tracking-wide">
          Semua Agenda Kegiatan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.length > 0 ? (
            events.map((e) => (
              <div
                key={e.id}
                className="bg-[#faf8f5] p-8 rounded-xl border border-neutral-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">
                      {e.date}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 bg-white text-neutral-700 rounded-full border border-neutral-200 shadow-2xs">
                      {e.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{e.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{e.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-500 col-span-1 md:col-span-2 text-center">Memuat daftar agenda...</p>
          )}
        </div>
      </section>
    </div>
  );
};
