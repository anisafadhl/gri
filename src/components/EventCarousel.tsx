import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEvents } from '../lib/supabase';

export interface EventSlide {
  id: string;
  date: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
}

export const EventCarousel: React.FC = () => {
  const [events, setEvents] = useState<EventSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchEventsData = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEventsData();
  }, []);

  useEffect(() => {
    if (isPaused || events.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex, events.length]);

  if (events.length === 0) {
    return <div className="min-h-[460px] flex items-center justify-center text-neutral-500">Memuat event...</div>;
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const currentEvent = events[currentIndex];

  return (
    <div
      className="relative w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Bright Carousel Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-neutral-200/80 shadow-xl hover:shadow-2xl transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Image Banner */}
          <div className="lg:col-span-6 relative h-64 lg:h-auto overflow-hidden bg-neutral-100">
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gold text-white shadow-md uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                {currentEvent.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between text-left space-y-6 bg-white">
            <div className="space-y-4">
              {/* Date & Location */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gold font-bold">
                  <Calendar className="w-4 h-4 text-gold shrink-0" />
                  <span>{currentEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{currentEvent.location || 'Gereja Rasuli Indonesia'}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
                {currentEvent.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {currentEvent.description}
              </p>
            </div>

            {/* Action Buttons & Counter */}
            <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
              <Link
                to="/connect"
                className="inline-block px-6 py-3 bg-gold hover:bg-gold-light text-white text-sm font-semibold rounded-md transition-colors duration-300 shadow-md uppercase tracking-wider no-underline"
              >
                Ikuti Event
              </Link>
              <span className="text-xs text-neutral-400 font-mono tracking-widest font-semibold">
                0{currentIndex + 1} / 0{events.length}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-gold text-neutral-800 hover:text-white flex items-center justify-center border border-neutral-200 transition-all duration-300 shadow-md hover:scale-110 focus:outline-none"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-gold text-neutral-800 hover:text-white flex items-center justify-center border border-neutral-200 transition-all duration-300 shadow-md hover:scale-110 focus:outline-none"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center items-center gap-2.5 mt-6">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
              currentIndex === index
                ? 'w-8 bg-gold'
                : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
