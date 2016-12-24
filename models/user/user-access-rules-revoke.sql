REVOKE ALL PRIVILEGES ON demo.user FROM anonymous, active_user, inactive_user;
drop policy if exists users_select_unsecure on demo.user;

ALTER TABLE demo.user DISABLE ROW LEVEL SECURITY;
