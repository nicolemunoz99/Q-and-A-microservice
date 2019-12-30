TRUNCATE data.questions CASCADE;
COPY data.questions FROM '/Users/anatase/galvanize/sdc/data/questions.csv' CSV HEADER;
SELECT setval('data.questions_question_id_seq'::regclass, (SELECT MAX(question_id) FROM data.questions));





TRUNCATE data.answers CASCADE;
COPY data.answers FROM '/Users/anatase/galvanize/sdc/data/answers.csv' CSV HEADER;
SELECT setval('data.answers_answer_id_seq'::regclass, (SELECT MAX(answer_id) FROM data.answers));





TRUNCATE data.photos;
COPY data.photos FROM '/Users/anatase/galvanize/sdc/data/photos.csv' CSV HEADER;
SELECT setval('data.photos_id_seq'::regclass, (SELECT MAX(id) FROM data.photos));

