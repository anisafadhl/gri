-- ============================================================
-- SQL SCHEMA FOR GEREJA RASULI INDONESIA (GRI) SUPABASE
-- BUCKET STORAGE UNTUK GAMBAR EVENT
-- Jalankan skrip ini di SQL Editor dashboard Supabase Anda
-- ============================================================

-- Create a bucket for event images (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('events', 'events', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Allow public access to view images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'events');

-- Allow authenticated users to upload/update/delete images
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
