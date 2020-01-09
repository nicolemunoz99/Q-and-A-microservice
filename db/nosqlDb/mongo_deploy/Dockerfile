FROM mongo:4.0

# copy csv data

COPY ./deploy_data /csv_data

# run bash script to import csv's into mongoDB collections

COPY ./loadData.sh /docker-entrypoint-initdb.d/loadData.sh

EXPOSE 27017