REVOKE ALL PRIVILEGES ON {0}.{1} FROM anonymous, active_user, inactive_user;

drop policy if exists {1}_select_unsecure on {0}.{1};

ALTER TABLE {0}.{1} DISABLE ROW LEVEL SECURITY;
DROP TABLE {0}.{1};
