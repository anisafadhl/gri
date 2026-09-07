import { useState, useEffect } from 'react';
import { getSiteSettings } from '../lib/supabase';

export function useHeroImage() {
  const [heroImage, setHeroImage] = useState<string>('/Gereja Rasuli Indonesia Jemaat Zion Filadelfia.png');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getSiteSettings();
        if (settings && settings.hero_image) {
          setHeroImage(settings.hero_image);
        }
      } catch (err) {
        console.error('Failed to fetch hero image:', err);
      }
    };
    fetchSettings();
  }, []);

  return heroImage;
}
