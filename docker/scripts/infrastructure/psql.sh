#!/usr/bin/env bash

sudo mkdir /var/lib/postgresql/data/dbcontent
sudo chown -R postgres:postgres /var/lib/postgresql/data

sudo -u postgres /usr/lib/postgresql/9.5/bin/initdb -D /var/lib/postgresql/data/dbcontent

service postgresql start

sudo -u postgres psql -f /home/web/docker/config/infrastructure/psql/setup.sql

service postgresql stop

sudo -u postgres /usr/lib/postgresql/9.5/bin/postgres -D /var/lib/postgresql/data/dbcontent -c config_file=/etc/postgresql/9.5/main/postgresql.conf