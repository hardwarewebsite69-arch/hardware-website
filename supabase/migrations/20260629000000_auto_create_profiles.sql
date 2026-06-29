-- Auto-create a profile row when a new user signs up or is invited.
-- This is a safety net so auth.users and public.profiles stay in sync even
-- if the application layer misses a profile write.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, updated_at)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.email,
      'New User'
    ),
    coalesce(
      new.raw_user_meta_data ->> 'role',
      'staff'
    ),
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Drop the trigger first to make the migration idempotent
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
