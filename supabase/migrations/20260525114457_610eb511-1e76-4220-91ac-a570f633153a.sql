-- Restrict writes on case-videos bucket to authenticated users only
CREATE POLICY "Authenticated can upload case-videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'case-videos');

CREATE POLICY "Authenticated can update case-videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'case-videos')
WITH CHECK (bucket_id = 'case-videos');

CREATE POLICY "Authenticated can delete case-videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'case-videos');