ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS image_url text NOT NULL DEFAULT '', ADD COLUMN IF NOT EXISTS video_url text NOT NULL DEFAULT '';
ALTER TABLE public.instructors ADD COLUMN IF NOT EXISTS avatar_url text NOT NULL DEFAULT '';
ALTER TABLE public.catalog_categories ADD COLUMN IF NOT EXISTS image_url text NOT NULL DEFAULT '';