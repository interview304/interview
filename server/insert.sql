-- Insert statements
INSERT INTO Questions VALUES(0, 'What school do you go to?', 1.0, 'general', 'Applicant should indicate school & provide some background info.');
INSERT INTO Questions VALUES(1, 'What is the fastest possible runtime of a comparison based sorting algorithm?', 2.0, 'technical', 'O(nlog(n))');
INSERT INTO Questions VALUES(2, 'What is the difference between a thread and a process?', 3.0, 'technical', 'A thread is a path of execution within a process and a process can contain multiple threads');
INSERT INTO Questions VALUES(3, 'What are some projects you recently worked on?', 2.0, 'general', 'Candidate should bring up recent projects and describe what they have learned throughout that process');
INSERT INTO Questions VALUES(4, 'What does CSS stand for?', 1.0, 'technical', 'Cascading Style Sheet');

-- IMPORTANT: when making any changes to position please update the dropdown in index.jsx 
INSERT INTO Position VALUES(0, 'Sales Associate', 'Sales', 'Full time');
INSERT INTO Position VALUES(1, 'Graphics Designer', 'Marketing', 'Full time');
INSERT INTO Position VALUES(2, 'Backend Engineer', 'Software', 'Full time');
INSERT INTO Position VALUES(3, 'Frontend Engineer', 'Software', 'Full time');
INSERT INTO Position VALUES(4, 'Data Science', 'Software','Internship');

INSERT INTO Location VALUES('0', '0');
INSERT INTO Location VALUES('2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Location VALUES('2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Location VALUES('2053 Main Mall, Vancouver, BC, V6T 1Z2', 'c');
INSERT INTO Location VALUES('2366 Main Mall, Vancouver, BC, V6T 1Z4', 'c');
INSERT INTO Location VALUES('800 Junior Road Vancouver, BC, V6T 2J1', 'M');
INSERT INTO Location VALUES('5282 Fifth Street Vancouver, BC, V6A 3B9', 'j');

INSERT INTO Provides_Amenities VALUES(0, 'accessibility', 'translator', '2053 Main Mall, Vancouver, BC, V6T 1Z2','a');
INSERT INTO Provides_Amenities VALUES(1, 'equipment', 'projector', '2053 Main Mall, Vancouver, BC, V6T 1Z2','a');
INSERT INTO Provides_Amenities VALUES(2, 'accessibility', 'wheelchair ramp', '2053 Main Mall, Vancouver, BC, V6T 1Z2','c');
INSERT INTO Provides_Amenities VALUES(3, 'supplies', 'whiteboard eraser', '2053 Main Mall, Vancouver, BC, V6T 1Z2','c');
INSERT INTO Provides_Amenities VALUES(4, 'supplies', 'stapler', '2053 Main Mall, Vancouver, BC, V6T 1Z2','c');

INSERT INTO Available VALUES(9, '2019-05-29 16:00:00', '2019-05-29 17:00:00', 2, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(10, '2019-05-27 16:00:00', '2019-05-27 17:00:00', 2, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(11, '2019-05-27 18:00:00', '2019-05-27 19:00:00', 2, '5282 Fifth Street Vancouver, BC, V6A 3B9', 'j');
INSERT INTO Available VALUES(12, '2019-05-27 19:00:00', '2019-05-27 20:00:00', 2, '800 Junior Road Vancouver, BC, V6T 2J1', 'M');

INSERT INTO Available VALUES(0, '2000-01-01 00:00:00', '2000-01-01 01:00:00', 0, '0', '0');
INSERT INTO Available VALUES(5, '2019-07-02 11:00:00', '2019-07-02 12:00:00', 1, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(6, '2019-07-02 14:00:00', '2019-07-02 15:00:00', 1, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(7, '2019-07-02 15:00:00', '2019-07-02 16:00:00', 1, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(8, '2019-07-02 16:00:00', '2019-07-02 17:00:00', 1, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(13, '2019-07-02 11:00:00', '2019-07-02 12:00:00', 2, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(14, '2019-07-02 14:00:00', '2019-07-02 15:00:00', 2, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(15, '2019-07-02 15:00:00', '2019-07-02 16:00:00', 2, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(16, '2019-07-02 16:00:00', '2019-07-02 17:00:00', 2, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(17, '2019-07-02 11:00:00', '2019-07-02 12:00:00', 3, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(18, '2019-07-02 14:00:00', '2019-07-02 15:00:00', 3, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(19, '2019-07-02 15:00:00', '2019-07-02 16:00:00', 3, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(20, '2019-07-02 16:00:00', '2019-07-02 17:00:00', 3, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(21, '2019-07-02 11:00:00', '2019-07-02 12:00:00', 4, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(22, '2019-07-02 14:00:00', '2019-07-02 15:00:00', 4, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(23, '2019-07-02 15:00:00', '2019-07-02 16:00:00', 4, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(24, '2019-07-02 16:00:00', '2019-07-02 17:00:00', 4, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
--
INSERT INTO Available VALUES(25, '2019-07-03 11:00:00', '2019-07-03 12:00:00', 1, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(26, '2019-07-03 14:00:00', '2019-07-03 15:00:00', 1, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(27, '2019-07-03 15:00:00', '2019-07-03 16:00:00', 1, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(28, '2019-07-03 16:00:00', '2019-07-03 17:00:00', 1, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(29, '2019-07-03 11:00:00', '2019-07-03 12:00:00', 2, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(30, '2019-07-03 14:00:00', '2019-07-03 15:00:00', 2, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(31, '2019-07-03 15:00:00', '2019-07-03 16:00:00', 2, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(32, '2019-07-03 16:00:00', '2019-07-03 17:00:00', 2, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(33, '2019-07-03 11:00:00', '2019-07-03 12:00:00', 3, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(34, '2019-07-03 14:00:00', '2019-07-03 15:00:00', 3, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(35, '2019-07-03 15:00:00', '2019-07-03 16:00:00', 3, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(36, '2019-07-03 16:00:00', '2019-07-03 17:00:00', 3, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(37, '2019-07-03 11:00:00', '2019-07-03 12:00:00', 4, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(38, '2019-07-03 14:00:00', '2019-07-03 15:00:00', 4, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(39, '2019-07-03 15:00:00', '2019-07-03 16:00:00', 4, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(40, '2019-07-03 16:00:00', '2019-07-03 17:00:00', 4, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
--
INSERT INTO Available VALUES(41, '2019-07-04 11:00:00', '2019-07-04 12:00:00', 1, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(42, '2019-07-04 14:00:00', '2019-07-04 15:00:00', 1, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(43, '2019-07-04 15:00:00', '2019-07-04 16:00:00', 1, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(44, '2019-07-04 16:00:00', '2019-07-04 17:00:00', 1, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(45, '2019-07-04 11:00:00', '2019-07-04 12:00:00', 2, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(46, '2019-07-04 14:00:00', '2019-07-04 15:00:00', 2, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(47, '2019-07-04 15:00:00', '2019-07-04 16:00:00', 2, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(48, '2019-07-04 16:00:00', '2019-07-04 17:00:00', 2, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(49, '2019-07-04 11:00:00', '2019-07-04 12:00:00', 3, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(50, '2019-07-04 14:00:00', '2019-07-04 15:00:00', 3, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(51, '2019-07-04 15:00:00', '2019-07-04 16:00:00', 3, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(52, '2019-07-04 16:00:00', '2019-07-04 17:00:00', 3, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(53, '2019-07-04 11:00:00', '2019-07-04 12:00:00', 4, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(54, '2019-07-04 14:00:00', '2019-07-04 15:00:00', 4, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a');
INSERT INTO Available VALUES(55, '2019-07-04 15:00:00', '2019-07-04 16:00:00', 4, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');
INSERT INTO Available VALUES(56, '2019-07-04 16:00:00', '2019-07-04 17:00:00', 4, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b');

INSERT INTO Interviewee VALUES(0,'0000000000','0','0','0', 0,'0');
INSERT INTO Interviewee VALUES(1,'604-123-1234','Felix','reviewing','600 Pine St, #403, Seattle, WA 98101',23,'felix@gmail.com');
INSERT INTO Interviewee VALUES(2,'604-111-2222','Gordon','reviewing','2621 NE 46th Street, Seattle, WA 98105',31,'gordon@gmail.com');
INSERT INTO Interviewee VALUES(3,'604-333-4444','Helen', 'reviewing','4151 Hazelbridge Way, Richmond, BC V6X 0A4',25,'helen@gmail.com');
INSERT INTO Interviewee VALUES(4,'604-567-5678','Ivy', 'reviewing','302 W Hastings St, Vancouver, BC V6B 2N4',21,'ivy@gmail.com');

INSERT INTO Booked VALUES(0, '2000-01-01 00:00:00', '2000-01-01 01:00:00', 0, '0', '0', 0);
INSERT INTO Booked VALUES(1, '2019-07-02 11:00:00', '2019-07-02 12:00:00', 1, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a', 1);
INSERT INTO Booked VALUES(2, '2019-07-03 14:00:00', '2019-07-03 15:00:00', 2, '2053 Main Mall, Vancouver, BC, V6T 1Z2', 'a', 2);
INSERT INTO Booked VALUES(3, '2019-07-04 15:00:00', '2019-07-04 16:00:00', 3, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'b', 3);
INSERT INTO Booked VALUES(4, '2019-07-05 16:00:00', '2019-07-05 17:00:00', 4, '2366 Main Mall, Vancouver, BC, V6T 1Z4', 'c', 4);

INSERT INTO Interviewer VALUES (0, 'Alice', 'Marketing Manager');
INSERT INTO Interviewer VALUES (1, 'Bob', 'Frontend Engineer');
INSERT INTO Interviewer VALUES (2, 'Cindy', 'Backend Engineer');
INSERT INTO Interviewer VALUES (3, 'Dan', 'UI UX Designer');
INSERT INTO Interviewer VALUES (4, 'Ella', 'Senior Software Engineer');

INSERT INTO Conducts VALUES(0, 5, 0);
INSERT INTO Conducts VALUES(0, 6, 1);
INSERT INTO Conducts VALUES(2, 0, 2);
INSERT INTO Conducts VALUES(2 ,0 ,3);
INSERT INTO Conducts VALUES(3, 0, 4);

INSERT INTO Agreement VALUES(0, 0, false, false);
INSERT INTO Agreement VALUES(1, 1, true, true);
INSERT INTO Agreement VALUES(2, 2, true, true);
INSERT INTO Agreement VALUES(3, 3, true, true);
INSERT INTO Agreement VALUES(4, 4, true, true);

-- (BookedID, AvailableID, QuestionID)
INSERT INTO Contains VALUES(0, 5, 0);
INSERT INTO Contains VALUES(0, 5, 1);
INSERT INTO Contains VALUES(0, 5, 2);
INSERT INTO Contains VALUES(0, 5, 3);
INSERT INTO Contains VALUES(0, 5, 4);
INSERT INTO Contains VALUES(0, 6, 0);
INSERT INTO Contains VALUES(0, 6, 1);
INSERT INTO Contains VALUES(0, 6, 2);
INSERT INTO Contains VALUES(0, 6, 3);
INSERT INTO Contains VALUES(0, 6, 4);
INSERT INTO Contains VALUES(0, 7, 0);
INSERT INTO Contains VALUES(0, 7, 1);
INSERT INTO Contains VALUES(0, 7, 2);
INSERT INTO Contains VALUES(0, 7, 3);
INSERT INTO Contains VALUES(0, 7, 4);
INSERT INTO Contains VALUES(0, 8, 0);
INSERT INTO Contains VALUES(0, 8, 1);
INSERT INTO Contains VALUES(0, 8, 2);
INSERT INTO Contains VALUES(0, 8, 3);
INSERT INTO Contains VALUES(0, 8, 4);
INSERT INTO Contains VALUES(1, 0, 1);
INSERT INTO Contains VALUES(2, 0, 2);
INSERT INTO Contains VALUES(3, 0, 3);
INSERT INTO Contains VALUES(4, 0, 4);

INSERT INTO Contains VALUES(0, 10, 0);
INSERT INTO Contains VALUES(0, 9, 3);
INSERT INTO Contains VALUES(0, 11, 1);
INSERT INTO Contains VALUES(0, 12, 3);
INSERT INTO Contains VALUES(0, 11, 2);
INSERT INTO Contains VALUES(0, 12, 1);



