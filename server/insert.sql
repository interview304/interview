-- Insert statements
INSERT INTO Role VALUES('Marketing Manager', 77000);
INSERT INTO Role VALUES('Frontend Engineer', 70000);
INSERT INTO Role VALUES('Backend Engineer', 80000);
INSERT INTO Role VALUES('UI UX Designer', 63000);
INSERT INTO Role VALUES('Senior Software Engineer', 102000);

INSERT INTO Duration VALUES('2000-02-02 2:00:00','2000-02-02 2:00:00',1);
INSERT INTO Duration VALUES('2019-05-25 10:00:00','2019-05-25 11:00:00',1);
INSERT INTO Duration VALUES('2019-05-25 14:00:00','2019-05-25 15:00:00',1);
INSERT INTO Duration VALUES('2019-05-25 15:00:00','2019-05-25 16:00:00',1);
INSERT INTO Duration VALUES('2019-05-25 16:00:00','2019-05-25 17:00:00',1);

INSERT INTO Questions VALUES(0, 'What school do you go to?', 'easy', 'general', 'Applicant should indicate school & provide some background info.');
INSERT INTO Questions VALUES(1, 'What is the fastest possible runtime of a comparison based sorting algorithm?', 'medium', 'technical', 'O(nlog(n))');
INSERT INTO Questions VALUES(2, 'What is the difference between a thread and a process?', 'hard', 'technical', 'A thread is a path of execution within a process and a process can contain multiple threads');
INSERT INTO Questions VALUES(3, 'What are some projects you recently worked on?', 'medium', 'general', 'Candidate should bring up recent projects and describe what they have learned throughout that process');
INSERT INTO Questions VALUES(4, 'What does CSS stand for?', 'easy', 'technical', 'Cascading Style Sheet');

-- IMPORTANT: when making any changes to position please update the dropdown in index.jsx 
INSERT INTO Position VALUES(0, 'Sales Associate', 'Sales', 'Full time');
INSERT INTO Position VALUES(1, 'Graphics Designer', 'Marketing', 'Full time');
INSERT INTO Position VALUES(2, 'Backend Engineer', 'Software', 'Full time');
INSERT INTO Position VALUES(3, 'Frontend Engineer', 'Software', 'Full time');
INSERT INTO Position VALUES(4, 'Data Science', 'Software','Internship');

INSERT INTO Location VALUES('0', '0');
INSERT INTO Location VALUES('1234 Fifth Street Vancouver, BC, V6Z 3B7', 'a');
INSERT INTO Location VALUES('5678 Ninth Street Vancouver, BC, V6Z 3B7', 'b');
INSERT INTO Location VALUES('1234 Fifth Street Vancouver, BC, V6Z 3B7', 'c');
INSERT INTO Location VALUES('5678 Ninth Street Vancouver, BC, V6Z 3B7', 'c');

INSERT INTO Provides_Amenities VALUES(0, 'accessibility', 'translator', '1234 Fifth Street Vancouver, BC, V6Z 3B7','a');
INSERT INTO Provides_Amenities VALUES(1, 'equipment', 'projector', '1234 Fifth Street Vancouver, BC, V6Z 3B7','a');
INSERT INTO Provides_Amenities VALUES(2, 'accessibility', 'wheelchair ramp', '1234 Fifth Street Vancouver, BC, V6Z 3B7','c');
INSERT INTO Provides_Amenities VALUES(3, 'supplies', 'whiteboard eraser', '1234 Fifth Street Vancouver, BC, V6Z 3B7','c');
INSERT INTO Provides_Amenities VALUES(4, 'supplies', 'stapler', '1234 Fifth Street Vancouver, BC, V6Z 3B7','c');

INSERT INTO Available VALUES(0, '2000-02-02 2:00:00', '2000-02-02 2:00:00', 0, '0', '0');
INSERT INTO Available VALUES(4, '2019-05-25 10:00:00', '2019-05-25 11:00:00', 1, '1234 Fifth Street Vancouver, BC, V6Z 3B7', 'a');
INSERT INTO Available VALUES(2, '2019-05-25 14:00:00', '2019-05-25 15:00:00', 2, '1234 Fifth Street Vancouver, BC, V6Z 3B7', 'a');
INSERT INTO Available VALUES(8, '2019-05-25 15:00:00', '2019-05-25 16:00:00', 3, '5678 Ninth Street Vancouver, BC, V6Z 3B7', 'b');
INSERT INTO Available VALUES(9, '2019-05-25 16:00:00', '2019-05-25 17:00:00', 0, '5678 Ninth Street Vancouver, BC, V6Z 3B7', 'b');

INSERT INTO Interviewee VALUES(0,'0000000000','0','0','0',0,'0');
INSERT INTO Interviewee VALUES(1,'604-123-1234','Felix','reviewing','600 Pine St, #403 Seattle, WA 98101',23,'felix@gmail.com');
INSERT INTO Interviewee VALUES(2,'604-111-2222','Gordon','reviewing','2621 NE 46th Street Seattle, WA 98105',31,'gordon@gmail.com');
INSERT INTO Interviewee VALUES(3,'604-333-4444','Helen', 'reviewing','4151 Hazelbridge Way, Richmond, BC V6X 0A4',25,'helen@gmail.com');
INSERT INTO Interviewee VALUES(4,'604-567-5678','Ivy', 'reviewing','302 W Hastings St, Vancouver, BC V6B 2N4',21,'ivy@gmail.com');

INSERT INTO Booked VALUES(0, '2000-02-02 2:00:00', '2000-02-02 2:00:00', 0, '0', '0', 0);
INSERT INTO Booked VALUES(1, '2019-05-25 10:00:00', '2019-05-25 11:00:00', 1, '1234 Fifth Street Vancouver, BC, V6Z 3B7', 'a', 1);
INSERT INTO Booked VALUES(2, '2019-05-25 14:00:00', '2019-05-25 15:00:00', 2, '1234 Fifth Street Vancouver, BC, V6Z 3B7', 'a', 2);
INSERT INTO Booked VALUES(3, '2019-05-25 15:00:00', '2019-05-25 16:00:00', 3, '5678 Ninth Street Vancouver, BC, V6Z 3B7', 'b', 3);
INSERT INTO Booked VALUES(4, '2019-05-25 16:00:00', '2019-05-25 17:00:00', 4, '5678 Ninth Street Vancouver, BC, V6Z 3B7', 'c', 4);

INSERT INTO Interviewer VALUES (0, 'Alice', 'Marketing Manager');
INSERT INTO Interviewer VALUES (1, 'Bob', 'Frontend Engineer');
INSERT INTO Interviewer VALUES (2, 'Cindy', 'Backend Engineer');
INSERT INTO Interviewer VALUES (3, 'Dan', 'UI UX Designer');
INSERT INTO Interviewer VALUES (4, 'Ella', 'Senior Software Engineer');

INSERT INTO Conducts VALUES(0, 4, 0);
INSERT INTO Conducts VALUES(0, 2, 1);
INSERT INTO Conducts VALUES(2, 0, 2);
INSERT INTO Conducts VALUES(2 ,0 ,3);
INSERT INTO Conducts VALUES(3, 0, 4);

INSERT INTO Agreement VALUES(0, 0, false, false);
INSERT INTO Agreement VALUES(1, 1, true, true);
INSERT INTO Agreement VALUES(2, 2, true, true);
INSERT INTO Agreement VALUES(3, 3, true, true);
INSERT INTO Agreement VALUES(4, 4, true, true);

-- (BookedID, AvailableID, QuestionID)
INSERT INTO Contains VALUES(0, 4, 0);
INSERT INTO Contains VALUES(0, 4, 1);
INSERT INTO Contains VALUES(0, 4, 2);
INSERT INTO Contains VALUES(0, 4, 3);
INSERT INTO Contains VALUES(0, 4, 4);
INSERT INTO Contains VALUES(0, 2, 2);
INSERT INTO Contains VALUES(1, 0, 1);
INSERT INTO Contains VALUES(2, 0, 2);
INSERT INTO Contains VALUES(3, 0, 3);
INSERT INTO Contains VALUES(4, 0, 4);

