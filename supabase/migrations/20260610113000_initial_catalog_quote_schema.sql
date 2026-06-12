create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  sku text,
  description text,
  price numeric(12, 2),
  request_price boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  public_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  email text,
  message text,
  mode text not null check (mode in ('upload', 'manual')),
  status text not null default 'pending' check (status in ('pending', 'in_review', 'responded', 'closed')),
  upload_url text,
  upload_public_id text,
  upload_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  item_name text not null,
  quantity numeric(12, 2),
  unit text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  id boolean primary key default true check (id),
  business_name text not null default 'Amroz Traders',
  phone text not null default '0713355507',
  whatsapp_number text not null default '0713355507',
  updated_at timestamptz not null default now()
);

insert into public.settings (id, business_name, phone, whatsapp_number)
values (true, 'Amroz Traders', '0713355507', '0713355507')
on conflict (id) do update set
  business_name = excluded.business_name,
  phone = excluded.phone,
  whatsapp_number = excluded.whatsapp_number,
  updated_at = now();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.contacts enable row level security;
alter table public.settings enable row level security;

grant select on public.categories, public.products, public.product_images, public.settings to anon, authenticated;
grant insert on public.quotes, public.quote_items, public.contacts to anon, authenticated;
grant select, insert, update, delete on public.categories, public.products, public.product_images, public.quotes, public.quote_items, public.contacts, public.settings to authenticated;

create policy "public can read active categories"
on public.categories for select
to anon, authenticated
using (is_active = true);

create policy "public can read active products"
on public.products for select
to anon, authenticated
using (is_active = true);

create policy "public can read product images for active products"
on public.product_images for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products
    where products.id = product_images.product_id
      and products.is_active = true
  )
);

create policy "public can read settings"
on public.settings for select
to anon, authenticated
using (true);

create policy "public can create quotes"
on public.quotes for insert
to anon, authenticated
with check (status = 'pending');

create policy "public can create quote items"
on public.quote_items for insert
to anon, authenticated
with check (true);

create policy "public can create contacts"
on public.contacts for insert
to anon, authenticated
with check (true);

create policy "users can read own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

create policy "staff can manage catalog"
on public.categories for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
);

create policy "staff can manage products"
on public.products for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
);

create policy "staff can manage product images"
on public.product_images for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
);

create policy "staff can manage quotes"
on public.quotes for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
);

create policy "staff can manage quote items"
on public.quote_items for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
);

create policy "staff can manage contacts"
on public.contacts for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role in ('admin', 'staff')
  )
);

create policy "staff can manage settings"
on public.settings for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
);
