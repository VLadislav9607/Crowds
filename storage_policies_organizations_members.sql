-- Policy для SELECT: тільки owner може переглядати файли
CREATE POLICY "organization members owners can select files"
ON storage.objects
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  bucket_id = 'organizations_members' AND
  EXISTS (
    SELECT 1
    FROM public.organizations_members
    WHERE organizations_members.id = auth.uid()
    AND organizations_members.role = 'owner'
    AND organizations_members.deleted_at IS NULL
  )
);

-- Policy для INSERT: тільки owner може завантажувати файли
CREATE POLICY "organization members owners can insert files"
ON storage.objects
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'organizations_members' AND
  EXISTS (
    SELECT 1
    FROM public.organizations_members
    WHERE organizations_members.id = auth.uid()
    AND organizations_members.role = 'owner'
    AND organizations_members.deleted_at IS NULL
  )
);

-- Policy для UPDATE: тільки owner може оновлювати файли
CREATE POLICY "organization members owners can update files"
ON storage.objects
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'organizations_members' AND
  EXISTS (
    SELECT 1
    FROM public.organizations_members
    WHERE organizations_members.id = auth.uid()
    AND organizations_members.role = 'owner'
    AND organizations_members.deleted_at IS NULL
  )
)
WITH CHECK (
  bucket_id = 'organizations_members' AND
  EXISTS (
    SELECT 1
    FROM public.organizations_members
    WHERE organizations_members.id = auth.uid()
    AND organizations_members.role = 'owner'
    AND organizations_members.deleted_at IS NULL
  )
);

