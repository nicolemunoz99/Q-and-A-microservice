CREATE DATABASE qanda;

\c qanda;

CREATE SCHEMA data;

CREATE TABLE data.questions(
        question_id SERIAL primary key NOT NULL,
        product_id INT NOT NULL,
        question_body VARCHAR NOT NULL,
        question_date VARCHAR NOT NULL,
        asker_name VARCHAR NOT NULL,
        asker_email VARCHAR NOT NULL,
        reported INT DEFAULT 0 CHECK(reported=0 OR reported=1),
        helpful INT DEFAULT 0 
        );

TRUNCATE data.questions CASCADE;
COPY data.questions FROM '/csv_data/questions.csv' CSV HEADER;
SELECT setval('data.questions_question_id_seq'::regclass, (SELECT MAX(question_id) FROM data.questions));



CREATE TABLE data.answers(
        answer_id SERIAL primary key,
        question_id INT,
        body VARCHAR,
        date VARCHAR,
        answerer_name VARCHAR,
        answerer_email VARCHAR,
        reported INT DEFAULT 0 CHECK(reported=0 OR reported=1),
        helpful INT DEFAULT 0,
        FOREIGN KEY (question_id) REFERENCES data.questions (question_id) ON DELETE CASCADE
        );

TRUNCATE data.answers CASCADE;
COPY data.answers FROM '/csv_data/answers.csv' CSV HEADER;
SELECT setval('data.answers_answer_id_seq'::regclass, (SELECT MAX(answer_id) FROM data.answers));





CREATE TABLE data.photos(
        id SERIAL primary key,
        answer_id INT,
        url VARCHAR,
        FOREIGN KEY (answer_id) REFERENCES data.answers (answer_id) ON DELETE CASCADE
        );

TRUNCATE data.photos;
COPY data.photos FROM '/csv_data/photos.csv' CSV HEADER;
SELECT setval('data.photos_id_seq'::regclass, (SELECT MAX(id) FROM data.photos));