-- ============================================================
-- SQL SCHEMA FIX UNTUK INSERT PENGATURAN BARU
-- Jalankan skrip ini di SQL Editor dashboard Supabase Anda
-- ============================================================

-- Drop if exists to avoid errors
DROP POLICY IF EXISTS "Allow authenticated insert on site_settings" ON public.site_settings;

-- Allow authenticated users (admin) to INSERT new settings (like hero_image)
CREATE POLICY "Allow authenticated insert on site_settings"
    ON public.site_settings
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
