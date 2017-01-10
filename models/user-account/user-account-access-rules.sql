create or replace view demo.{1} as
select
  actual._id as _id,
  actual.role as role,
  actual.verified as verified
from {0}.{1} as actual;

grant select on table {0}.{1} to anonymous;
