drop policy if exists {1}_select_unsecure on {0}.{1};

ALTER TABLE {0}.{1} DISABLE ROW LEVEL SECURITY;
