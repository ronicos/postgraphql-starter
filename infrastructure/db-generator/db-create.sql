-- CREATE ROLE authenticator NOINHERIT LOGIN SUPERUSER password {0};
do $$

begin

create role anonymous;
create role active_user;
create role inactive_user;

exception when others then
    raise notice '% %', SQLERRM, SQLSTATE;
end;


$$ language 'plpgsql';

grant active_user, inactive_user, anonymous to {1};

create schema if not exists {0};
create schema if not exists {0}_private;

grant usage on schema {0} to anonymous, active_user, inactive_user;
grant usage on schema {0}_private to anonymous, active_user, inactive_user;
