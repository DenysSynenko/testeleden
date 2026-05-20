INSERT INTO storage.buckets (id, name, public) VALUES ('case-videos', 'case-videos', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read case-videos" ON storage.objects FOR SELECT USING (bucket_id = 'case-videos');