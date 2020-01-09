#!/bin/bash

mongoimport --db qanda --type csv --mode merge --headerline --file /csv_data/photos.csv --numInsertionWorkers 8

mongoimport --db qanda --type csv --mode merge --headerline --file /csv_data/answers.csv --numInsertionWorkers 8

mongoimport --db qanda --type csv --mode merge --headerline --file /csv_data/questions.csv --numInsertionWorkers 8

rm -r /csv_data/