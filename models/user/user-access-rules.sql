grant select on table {0}.{1} to active_user, inactive_user;

ALTER TABLE {0}.{1} ENABLE ROW LEVEL SECURITY;

drop policy if exists {1}_select_unsecure on {0}.{1};
create policy {1}_select_unsecure on demo.user for select
  using (role = (select current_setting('jwt.claims.role')));
--  using (id::text = (select current_setting('jwt.claims.id')));
