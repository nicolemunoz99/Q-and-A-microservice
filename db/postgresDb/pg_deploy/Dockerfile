FROM postgres:12.1

COPY ./deploy_data /csv_data

COPY ./setup_db.sql /docker-entrypoint-initdb.d/setup_db.sql

EXPOSE 5432

ENV PGDATA=/data