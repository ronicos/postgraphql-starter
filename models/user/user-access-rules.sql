grant select on table {0}.{1} to active_user, inactive_user;

ALTER TABLE {0}.{1} ENABLE ROW LEVEL SECURITY;

drop policy if exists {1}_select_unsecure on {0}.{1};
create policy {1}_select_unsecure on {0}.{1} for select
  using (role = (select current_setting('jwt.claims.role')));
--  using (id::text = (select current_setting('jwt.claims.id')));

create table if not exists {0}_private.{1}_account (
  _id        integer primary key references {0}.{1}(_id) on delete cascade,
  email            text unique check (email ~* '^.+@.+\..+$'),
  phone            text unique check (length(role) < 15),
  role             name not null check (length(role) < 512),
  password_hash    text not null,
  verified         boolean not null default true
);

create or replace view {0}.{1}_account as
select
  actual._id as _id,
  actual.role as role,
  actual.verified as verified
from {0}_private.{1}_account as actual
where actual.role = (select current_setting('jwt.claims.role'));

grant select on table {0}_private.{1}_account to anonymous;
