-- Ejecuta este SQL en Supabase → SQL Editor → New query

create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text not null,
  event_type text not null,
  event_date date not null,
  location text not null,
  guests text,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'contacted', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists bookings_created_at_idx
  on public.bookings (created_at desc);

create index if not exists bookings_status_idx
  on public.bookings (status);

alter table public.bookings enable row level security;

-- Sin políticas públicas: el acceso se hace vía service role en el servidor Next.js.
-- Opcional: política de solo lectura para usuarios autenticados en el futuro.
