drop table if exists customers;

create table customers (

  id uuid primary key default gen_random_uuid(),

  loan_id text,

  full_name text,
  phone text,
  vehicle_number text,

  guarantor_name text,
  guarantor_phone text,

  customer_face text,
  customer_aadhar text,
  customer_signature text,
  income_proof text,

  guarantor_face text,
  guarantor_aadhar text,
  guarantor_signature text,

  vehicle_front text,
  vehicle_side text,
  odometer_photo text,
  rc_book text,

  address text,

  latitude text,
  longitude text,

  approval_status text default 'pending',

  recovery_status text default 'none',

  visited_status text default 'not-visited',

  visited_at timestamp,

  remarks text,

  created_at timestamp default now()
);