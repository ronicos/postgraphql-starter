grant usage on schema demo to anonymous, active_user, inactive_user;
grant select on table demo.user to active_user, inactive_user;

ALTER TABLE demo.user ENABLE ROW LEVEL SECURITY;

-- option 1
drop policy if exists users_select_unsecure on demo.user;
create policy users_select_unsecure on demo.user for select
  using (role = (SELECT CURRENT_USER));

-- option 2
drop policy if exists users_select_unsecure on demo.user;
create policy users_select_unsecure on demo.user for select
  using (id::text = (select current_setting('claims.id')));
