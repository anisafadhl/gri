-- ============================================================
-- SQL SCHEMA FOR GEREJA RASULI INDONESIA (GRI) SUPABASE
-- Jalankan skrip ini di SQL Editor dashboard Supabase Anda
-- ============================================================

-- 1. Tabel Pesan Kontak & Permohonan Doa
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public insert to contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated read contact_messages" ON public.contact_messages;

-- Izinkan siapa saja (anon) untuk mengirimkan pesan/doa (INSERT)
CREATE POLICY "Allow public insert to contact_messages"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Izinkan hanya user terotentikasi (admin/staff) untuk melihat pesan
CREATE POLICY "Allow authenticated read contact_messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);
