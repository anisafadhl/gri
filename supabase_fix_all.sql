-- ============================================================
-- SQL PERBAIKAN LENGKAP UNTUK SITE_SETTINGS & STORAGE
-- Jalankan skrip ini di SQL Editor dashboard Supabase Anda
-- ============================================================

-- 1. Pastikan kolom hero_image sudah ada di default site_settings
INSERT INTO public.site_settings (id, value, description)
VALUES ('hero_image', '/Gereja Rasuli Indonesia Jemaat Zion Filadelfia.png', 'Gambar Banner Utama')
ON CONFLICT (id) DO NOTHING;

-- 2. Perbaiki Policy untuk tabel site_settings
DROP POLICY IF EXISTS "Allow authenticated insert on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated update on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated all on site_settings" ON public.site_settings;

CREATE POLICY "Allow authenticated insert on site_settings"
    ON public.site_settings
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update on site_settings"
    ON public.site_settings
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. Pastikan Storage Bucket 'events' dan policy-nya aktif
INSERT INTO storage.buckets (id, name, public) 
VALUES ('events', 'events', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'events');

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'events');

CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'events');

CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'events');
