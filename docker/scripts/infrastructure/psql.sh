#!/usr/bin/env bash

service postgresql start

sudo -u postgres psql -f /home/web/docker/config/infrastructure/psql/setup.sql

service postgresql stop

sudo chown -R postgres /var/lib/postgresql/9.5/main

sudo -u postgres /usr/lib/postgresql/9.5/bin/postgres -D /var/lib/postgresql/9.5/main -c config_file=/etc/postgresql/9.5/main/postgresql.conf