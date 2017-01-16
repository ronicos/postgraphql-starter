grant select on table {0}.{1} to active_user, inactive_user;

ALTER TABLE {0}.{1} ENABLE ROW LEVEL SECURITY;

create policy {1}_select_unsecure on {0}.{1} for select
  using (_id::text = (select current_setting('jwt.claims._id')));

