-- Contains all init table statements
CREATE TABLE IF NOT EXISTS Role (
	role TEXT PRIMARY KEY,
	average_salary INT
);

CREATE TABLE IF NOT EXISTS Duration (
	start_time TIMESTAMP,
	end_time TIMESTAMP,
	duration INT,
	PRIMARY KEY (start_time, end_time)
);

CREATE TABLE IF NOT EXISTS Questions (
	id SERIAL PRIMARY KEY,
	question TEXT UNIQUE,
	difficulty Float,
	type TEXT,
	answer TEXT
);

CREATE TABLE IF NOT EXISTS Position (
	id SERIAL PRIMARY KEY,
	name TEXT,
	department TEXT,
	type TEXT
);

CREATE TABLE IF NOT EXISTS Location (
	address TEXT,
	room_name TEXT,
	PRIMARY KEY (address, room_name)
);

CREATE TABLE IF NOT EXISTS Provides_Amenities (
	id SERIAL PRIMARY KEY,
	type TEXT,
	name TEXT,
 	address TEXT,
	room_Name TEXT,
	FOREIGN KEY (address, room_name) REFERENCES Location
		ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Available (
	id SERIAL PRIMARY KEY,
	start_time TIMESTAMP NOT NULL,
	end_time TIMESTAMP NOT NULL,
	position_id SERIAL NOT NULL,
	address TEXT NOT NULL,
 	room_name TEXT NOT NULL,
  	FOREIGN KEY (position_id) REFERENCES Position
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (address, room_name) REFERENCES Location
		ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Interviewee (
	id SERIAL PRIMARY KEY,
	phone_number TEXT,
	name TEXT,
	status TEXT,
	address TEXT,
	age INT,
	email TEXT
);

CREATE TABLE IF NOT EXISTS Booked (
	id SERIAL PRIMARY KEY,
	start_time TIMESTAMP NOT NULL,
	end_time TIMESTAMP NOT NULL,
	position_id SERIAL NOT NULL,
	address TEXT NOT NULL,
 	room_name TEXT NOT NULL,
 	interviewee_id SERIAL NOT NULL,
  	FOREIGN KEY (position_id) REFERENCES Position
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (address, room_name) REFERENCES Location
		ON DELETE NO ACTION ON UPDATE CASCADE,
 	FOREIGN KEY (interviewee_id) REFERENCES Interviewee
 	 	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Interviewer (
	id SERIAL PRIMARY KEY,
	name TEXT,
	role TEXT
);

CREATE TABLE IF NOT EXISTS Conducts (
	booked_interview_id INTEGER DEFAULT 0,
 	available_interview_id INTEGER DEFAULT 0,
    interviewer_id SERIAL,
    PRIMARY KEY (booked_interview_id, available_interview_id, 
        interviewer_id),
    FOREIGN KEY (booked_interview_id) REFERENCES Booked
 	 	ON DELETE SET DEFAULT ON UPDATE CASCADE,
 	FOREIGN KEY (available_interview_id) REFERENCES Available
 	 	ON DELETE SET DEFAULT ON UPDATE CASCADE,
	FOREIGN KEY (interviewer_id) REFERENCES Interviewer
		ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Agreement (
 	id SERIAL UNIQUE NOT NULL,
 	interview_id SERIAL UNIQUE NOT NULL,
 	nda BOOLEAN NOT NULL,
 	terms_of_use BOOLEAN NOT NULL,
 	PRIMARY KEY (id, interview_id),
 	FOREIGN KEY (interview_id) REFERENCES Booked
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Contains (
 	booked_interview_id INTEGER DEFAULT 0,
 	available_interview_id INTEGER DEFAULT 0,
    question_id SERIAL,
 	PRIMARY KEY (booked_interview_id, available_interview_id, 
            question_id),
 	FOREIGN KEY (booked_interview_id) REFERENCES Booked
 	 	ON DELETE SET DEFAULT ON UPDATE CASCADE,
 	FOREIGN KEY (available_interview_id) REFERENCES Available
 	 	ON DELETE SET DEFAULT ON UPDATE CASCADE,
 	FOREIGN KEY (question_id) REFERENCES Questions
 	 	ON DELETE CASCADE ON UPDATE CASCADE
);


