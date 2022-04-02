CREATE DATABASE pern_notes;

CREATE TABLE users(

	id SERIAL,
	name varchar(255),
	email varchar(255),
	password varchar(255),
	PRIMARY KEY(id)

);

CREATE TABLE notes(

    id SERIAL,
    user_id bigint NOT NULL,
    note_title varchar(255),
    note_description varchar(1000),
    date_created TIMESTAMP,
    date_updated TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)

);