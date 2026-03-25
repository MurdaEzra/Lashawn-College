create table if not exists public.service_invoice_counters (
  invoice_year integer primary key,
  last_number integer not null default 0,
  updated_at timestamptz not null default now()
);

create or replace function public.next_service_invoice_number(requested_invoice_year integer default null)
returns text
language plpgsql
security definer
as $$
declare
  target_year integer := coalesce(requested_invoice_year, extract(year from now())::integer);
  next_number integer;
begin
  insert into public.service_invoice_counters (invoice_year, last_number)
  values (target_year, 1)
  on conflict (invoice_year)
  do update set
    last_number = public.service_invoice_counters.last_number + 1,
    updated_at = now()
  returning last_number into next_number;

  return 'INV-' || target_year || '-' || lpad(next_number::text, 4, '0');
end;
$$;

grant execute on function public.next_service_invoice_number(integer) to anon, authenticated, service_role;

create table if not exists public.service_invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  client_name text not null,
  branch text,
  phone text,
  email text,
  service_title text not null,
  service_description text,
  amount numeric(12, 2) not null default 0,
  amount_paid numeric(12, 2) not null default 0,
  balance numeric(12, 2) not null default 0,
  status text not null default 'Pending',
  invoice_date date not null default current_date,
  due_date date,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists service_invoices_created_at_idx
  on public.service_invoices (created_at desc);
