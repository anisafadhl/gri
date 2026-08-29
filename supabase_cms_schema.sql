-- Schema for Dynamic CMS (Content Management System) for GRI Website

-- 1. Table: site_settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT
);

-- Turn on Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated update on site_settings" ON public.site_settings;

-- Allow anonymous read access
CREATE POLICY "Allow public read access on site_settings"
    ON public.site_settings
    FOR SELECT
    TO public
    USING (true);

-- Allow authenticated users to update settings
CREATE POLICY "Allow authenticated update on site_settings"
    ON public.site_settings
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert default CMS content
INSERT INTO public.site_settings (id, value, description) VALUES
('hero_title', 'Welcome to Gereja Rasuli Indonesia', 'Judul besar pada Banner Utama di halaman Beranda'),
('hero_subtitle', 'Jemaat Zion Filadelfia', 'Sub-judul pada Banner Utama (Teks berwarna Emas)'),
('hero_quote', '"To the angel of the church in Philadelphia write: These are the words of him who is holy and true, who holds the key of David. What he opens no one can shut, and what he shuts no one can open."', 'Kutipan Ayat di Banner Utama'),
('hero_quote_ref', '— Revelation 3:7', 'Referensi dari kutipan ayat di Banner Utama'),
('about_title', 'ONE BIG FAMILY', 'Judul bagian About Us (Sebelah Kiri)'),
('about_desc_1', 'Zion Filadelfia is a spiritual family that is alive, loving, and filled with the power of the Holy Spirit. We are called to prepare a people pleasing to God.', 'Paragraf 1 penjelasan gereja'),
('about_desc_2', 'Starting from a longing for true healing, this church began its “Mezbah Doa Pagi” on September 1, 2020, with a live streaming service during the COVID-19 pandemic. From this prayer meeting, a congregation built on prayer, truth, and anointing emerged. To date, the live streaming service has reached over 56,000 followers on Facebook, over 55,000 on TikTok, and over 22,000 subscribers on YouTube as of 2025.', 'Paragraf 2 penjelasan gereja'),
('visi_title', 'Menjadi Keluarga Rohani yang Berkenan Bagi Tuhan', 'Judul Visi Gereja'),
('visi_desc', 'Menjadi keluarga rohani yang hidup, penuh kasih, dan dipenuhi kuasa Roh Kudus untuk mempersiapkan umat yang berkenan di hadapan Tuhan.', 'Deskripsi Visi Gereja'),
('misi_title', 'Membangun Komunitas Doa & Kebenaran', 'Judul Misi Gereja'),
('misi_desc', 'Membawa kasih karunia dan kebenaran Kristus ke setiap bangsa, memuridkan jiwa-jiwa, dan membangun jemaat yang berlandaskan doa, kebenaran firman, dan pengurapan Roh Kudus.', 'Deskripsi Misi Gereja'),
('sermon_title', 'GRI Latest Sermon', 'Judul bagian khotbah terbaru'),
('sermon_youtube_id', '3aEH4-tlua8', 'ID Video YouTube (Karakter acak di akhir URL video, misal: 3aEH4-tlua8 dari https://youtu.be/3aEH4-tlua8)')
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value, description = EXCLUDED.description;


-- 2. Table: events
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access on events" ON public.events;
DROP POLICY IF EXISTS "Allow authenticated insert on events" ON public.events;
DROP POLICY IF EXISTS "Allow authenticated update on events" ON public.events;
DROP POLICY IF EXISTS "Allow authenticated delete on events" ON public.events;

-- Allow anonymous read access
CREATE POLICY "Allow public read access on events"
    ON public.events
    FOR SELECT
    TO public
    USING (true);

-- Allow authenticated users to manage events
CREATE POLICY "Allow authenticated insert on events"
    ON public.events FOR INSERT TO authenticated WITH CHECK (true);
    
CREATE POLICY "Allow authenticated update on events"
    ON public.events FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
    
CREATE POLICY "Allow authenticated delete on events"
    ON public.events FOR DELETE TO authenticated USING (true);

-- Clear old events
TRUNCATE TABLE public.events;

-- Insert default events
INSERT INTO public.events (date, title, category, location, description, image) VALUES
('24 Desember 2026 • 18:00 WIB', 'Ibadah Malam Natal Bersama', 'Perayaan Khusus', 'Main Hall - Jemaat Zion Filadelfia', 'Mari rayakan momen syahdu kelahiran Juru Selamat bersama seluruh jemaat dan keluarga tercinta. Tersedia jamuan makan malam bersama setelah ibadah selesai.', '/event.png'),
('31 Desember 2026 • 21:00 WIB', 'Ibadah Tutup & Buka Tahun', 'Doa & Penyembahan', 'Main Sanctuary & Live Streaming', 'Malam doa, penyembahan, dan pengucapan syukur menyambut tahun yang baru dengan penuh iman, pengharapan, dan deklarasi janji firman Tuhan bagi keluarga kita.', '/event.png'),
('10 Januari 2027 • 10:00 WIB', 'Seminar Keluarga Bahagia: Fondasi Kuat', 'Workshop & Seminar', 'Auditorium Lt. 3 Zion Filadelfia', 'Membangun fondasi pernikahan dan keluarga yang kokoh di era modern bersama para pembicara dan konselor keluarga Kristen berpengalaman.', '/event.png'),
('15 Februari 2027 • 18:30 WIB', 'Youth Revival Night: Unstoppable Generation', 'Youth & Community', 'Youth Center GRI', 'Malam kebangunan rohani anak muda dengan puji-pujian berapi-api, firman yang relevan, dan persekutuan yang memberdayakan generasi muda.', '/event.png');
