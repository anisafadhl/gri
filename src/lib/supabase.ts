import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Fallback checking to prevent crashes if env is missing
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Auth Functions
export const signInAdmin = async (email: string, password: string) => {
  if (!supabase) return { error: { message: 'Database belum terhubung.' } };
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOutAdmin = async () => {
  if (!supabase) return;
  return await supabase.auth.signOut();
};

export const getSession = async () => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
};

// Submit Contact Form
export const submitContactMessage = async (data: any) => {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase is not configured. Simulating success...');
    return new Promise((resolve) => setTimeout(() => resolve({ error: null }), 800));
  }
  return await supabase.from('contact_messages').insert([data]);
};

const fallbackSettings: Record<string, string> = {
  hero_title: 'Welcome to Gereja Rasuli Indonesia',
  hero_subtitle: 'Jemaat Zion Filadelfia',
  hero_quote: '"To the angel of the church in Philadelphia write: These are the words of him who is holy and true, who holds the key of David. What he opens no one can shut, and what he shuts no one can open."',
  hero_quote_ref: '— Revelation 3:7',
  about_title: 'ONE BIG FAMILY',
  about_desc_1: 'Zion Filadelfia is a spiritual family that is alive, loving, and filled with the power of the Holy Spirit. We are called to prepare a people pleasing to God.',
  about_desc_2: 'Starting from a longing for true healing, this church began its “Mezbah Doa Pagi” on September 1, 2020, with a live streaming service during the COVID-19 pandemic. From this prayer meeting, a congregation built on prayer, truth, and anointing emerged. To date, the live streaming service has reached over 56,000 followers on Facebook, over 55,000 on TikTok, and over 22,000 subscribers on YouTube as of 2025.',
  visi_title: 'Menjadi Keluarga Rohani yang Berkenan Bagi Tuhan',
  visi_desc: 'Menjadi Keluarga rohani yang hidup, penuh kasih, dan dipenuhi kuasa Roh Kudus untuk mempersiapkan umat yang berkenan di hadapan Tuhan.',
  misi_title: 'Membangun Komunitas Doa & Kebenaran',
  misi_desc: 'Membawa kasih karunia dan kebenaran Kristus ke setiap bangsa, memuridkan jiwa-jiwa, dan membangun jemaat yang berlandaskan doa, kebenaran firman, dan pengurapan Roh Kudus.',
  sermon_title: 'KITA ADALAH ANAK-ANAK PERJANJIAN',
  sermon_speaker: 'Ps. Besron Jusup Roni Marpaung',
  sermon_youtube_id: '3aEH4-tlua8',
  giving_flyer: '/giving.png',
  giving_acc1_name: 'GRI Zion Filadelfia',
  giving_acc1_bank: 'BCA',
  giving_acc1_number: '1234567890',
  giving_acc1_qr: '',
  giving_acc2_name: 'Besron Jusup Roni Martuaung',
  giving_acc2_bank: 'BCA',
  giving_acc2_number: '0987654321',
  giving_acc2_qr: ''
};

// Fetch Dynamic Site Settings (with Fallbacks)
export const getSiteSettings = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackSettings;
  }

  try {
    const { data, error } = await supabase.from('site_settings').select('id, value');
    if (error || !data) return fallbackSettings;
    
    const settings: Record<string, string> = { ...fallbackSettings };
    data.forEach((item: any) => {
      settings[item.id] = item.value;
    });
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return fallbackSettings;
  }
};

// Update Dynamic Site Settings
export const updateSiteSetting = async (id: string, value: string) => {
  if (!supabase) return { error: { message: 'Supabase belum terhubung.' } };
  return await supabase.from('site_settings').upsert({ id, value }, { onConflict: 'id' });
};

// Fetch Dynamic Events (with Fallback)
export const getEvents = async () => {
  const fallbackEvents = [
    {
      id: '1',
      date: '24 Desember 2026 • 18:00 WIB',
      title: 'Ibadah Malam Natal Bersama',
      category: 'Perayaan Khusus',
      location: 'Main Hall - Jemaat Zion Filadelfia',
      description: 'Mari rayakan momen syahdu kelahiran Juru Selamat bersama seluruh jemaat dan keluarga tercinta.',
      image: '/event.png',
    },
    {
      id: '2',
      date: '31 Desember 2026 • 21:00 WIB',
      title: 'Ibadah Tutup & Buka Tahun',
      category: 'Doa & Penyembahan',
      location: 'Main Sanctuary & Live Streaming',
      description: 'Malam doa, penyembahan, dan pengucapan syukur menyambut tahun yang baru dengan penuh iman, pengharapan, dan deklarasi janji firman Tuhan.',
      image: '/event.png',
    }
  ];

  if (!isSupabaseConfigured || !supabase) {
    return fallbackEvents;
  }

  try {
    const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: true });
    if (error || !data || data.length === 0) return fallbackEvents;
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return fallbackEvents;
  }
};

// Add Event
export const addEvent = async (event: any) => {
  if (!supabase) return { error: { message: 'Database belum terhubung.' } };
  return await supabase.from('events').insert([event]);
};

// Update Event
export const updateEvent = async (id: string, event: any) => {
  if (!supabase) return { error: { message: 'Database belum terhubung.' } };
  return await supabase.from('events').update(event).eq('id', id);
};

// Delete Event
export const deleteEvent = async (id: string) => {
  if (!supabase) return { error: { message: 'Database belum terhubung.' } };
  return await supabase.from('events').delete().eq('id', id);
};