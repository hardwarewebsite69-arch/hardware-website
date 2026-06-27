create sequence if not exists public.quotation_number_seq
  start 1001
  increment 1;

alter table public.quotes
  add column if not exists quotation_number text;

alter table public.quote_items
  add column if not exists unit_price numeric(12,2);

create unique index if not exists quotes_quotation_number_idx on public.quotes(quotation_number) where quotation_number is not null;
