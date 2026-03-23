create table if not exists public.registration_counters (
  registration_year integer primary key,
  last_value integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.next_registration_number(registration_year integer default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  target_year integer := coalesce(registration_year, extract(year from now())::integer);
  next_value integer;
begin
  insert into public.registration_counters (registration_year, last_value)
  values (target_year, 1)
  on conflict (registration_year)
  do update set
    last_value = public.registration_counters.last_value + 1,
    updated_at = now()
  returning last_value into next_value;

  return format('LASH-%s-%s', target_year, lpad(next_value::text, 4, '0'));
end;
$$;

grant execute on function public.next_registration_number(integer) to anon, authenticated, service_role;
