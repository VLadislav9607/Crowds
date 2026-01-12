-- Policy для SELECT: будь-який авторизований користувач може переглядати файли
CREATE POLICY "authenticated users can select organization avatars"
ON storage.objects
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  bucket_id = 'organizations_avatars'
);

-- Policy для INSERT: тільки organization member з role = 'owner' може завантажувати файли
-- Ім'я папки (перша частина шляху) має відповідати organization_id користувача
CREATE POLICY "organization owners can insert avatars"
ON storage.objects
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'organizations_avatars' AND
  EXISTS (
    SELECT 1
    FROM public.organizations_members
    WHERE organizations_members.id = auth.uid()
    AND organizations_members.role = 'owner'
    AND organizations_members.deleted_at IS NULL
    AND (
      CASE 
        WHEN position('/' in name) > 0 
        THEN split_part(name, '/', 1) = organizations_members.organization_id::text
        ELSE name = organizations_members.organization_id::text
      END
    )
  )
);

-- Policy для UPDATE: тільки organization member з role = 'owner' може оновлювати файли
CREATE POLICY "organization owners can update avatars"
ON storage.objects
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'organizations_avatars' AND
  EXISTS (
    SELECT 1
    FROM public.organizations_members
    WHERE organizations_members.id = auth.uid()
    AND organizations_members.role = 'owner'
    AND organizations_members.deleted_at IS NULL
    AND (
      CASE 
        WHEN position('/' in name) > 0 
        THEN split_part(name, '/', 1) = organizations_members.organization_id::text
        ELSE name = organizations_members.organization_id::text
      END
    )
  )
)
WITH CHECK (
  bucket_id = 'organizations_avatars' AND
  EXISTS (
    SELECT 1
    FROM public.organizations_members
    WHERE organizations_members.id = auth.uid()
    AND organizations_members.role = 'owner'
    AND organizations_members.deleted_at IS NULL
    AND (
      CASE 
        WHEN position('/' in name) > 0 
        THEN split_part(name, '/', 1) = organizations_members.organization_id::text
        ELSE name = organizations_members.organization_id::text
      END
    )
  )
);

