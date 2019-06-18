package models

import (
	"database/sql"
	"fmt"
)

type AvailableInterview struct {
	ID         int    `json:"id"`
	Start      string `json:"start"`
	End        string `json:"end"`
	PositionID int    `json:"position"`
	Address    string `json:"address"`
	Room       string `json:"room"`
}

type BookedInterview struct {
	ID            int    `json:"id"`
	Start         string `json:"start"`
	End           string `json:"end"`
	PositionID    int    `json:"position"`
	Address       string `json:"address"`
	Room          string `json:"room"`
	IntervieweeID int    `json:"interviewee"`
}

func GetInterviews(db *sql.DB, start, end string) ([]AvailableInterview, error) {
	query := fmt.Sprintf(`SELECT * FROM Available WHERE (start_time BETWEEN '%s' AND '%s')
	AND (end_time BETWEEN '%s' AND '%s')`, start, end, start, end)
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	interviews := []AvailableInterview{}
	for rows.Next() {
		var interview AvailableInterview
		if err := rows.Scan(&interview.ID, &interview.Start, &interview.End,
			&interview.PositionID, &interview.Address, &interview.Room); err != nil {
			return nil, err
		}
		interviews = append(interviews, interview)
	}
	return interviews, nil
}

func GetInterviewsWithEveryQuestion(db *sql.DB) ([]AvailableInterview, error) {
	query := fmt.Sprintf(`SELECT * FROM Available a WHERE NOT EXISTS (
	SELECT * FROM Questions q WHERE NOT EXISTS (
		SELECT c.available_interview_id FROM Contains c
		WHERE a.id = c.available_interview_id AND q.id = c.question_id) )`)
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	interviews := []AvailableInterview{}
	for rows.Next() {
		var interview AvailableInterview
		if err := rows.Scan(&interview.ID, &interview.Start, &interview.End,
			&interview.PositionID, &interview.Address, &interview.Room); err != nil {
			return nil, err
		}
		interviews = append(interviews, interview)
	}
	return interviews, nil
}

func GetQuestionDifficulty(db *sql.DB, interviewId int) (string, error) {
	query := fmt.Sprintf(`SELECT difficulty FROM (
		SELECT question_id FROM Contains WHERE booked_interview_id = %d OR available_interview_id = %d) a, Questions b 
		WHERE a.question_id = b.id`, interviewId, interviewId)
	rows, err := db.Query(query)
	if err != nil {
		return "", err
	}
	count := 0.0
	sum := 0.0
	defer rows.Close()
	for rows.Next() {
		var difficulty string
		if err := rows.Scan(&difficulty); err != nil {
			return "", err
		}
		switch difficulty {
		case "easy":
			sum++
		case "medium":
			sum += 2
		case "hard":
			sum += 3
		}
		count++
	}
	avg := sum / count
	var difficulty string
	if avg > 1 && avg <= 1.5 {
		difficulty = "easy"
	} else if avg > 1.5 && avg <= 2.5 {
		difficulty = "medium"
	} else {
		difficulty = "hard"
	}
	return difficulty, nil
}

func DeleteInterview(db *sql.DB, interviewID int) error {

	getStatement := fmt.Sprintf(`SELECT id, start_time,
		 end_time, position_id, address, room_name
		  FROM Booked WHERE id = %d`, interviewID)

	row := db.QueryRow(getStatement)

	var available AvailableInterview

	if err := row.Scan(&available.ID, &available.Start, &available.End, &available.PositionID,
		&available.Address, &available.Room); err != nil {
		return err
	}

	if err := available.create(db); err != nil {
		return err
	}

	if err := updateConducts(db, interviewID, false); err != nil {
		return fmt.Errorf("Unable to update conduct table: %v", err)
	}

	if err := updateContains(db, interviewID, false); err != nil {
		return fmt.Errorf("unable to update contains table: %v", err)
	}

	statement := fmt.Sprintf(`DELETE FROM Booked
		WHERE id = %d`, interviewID)

	if _, err := db.Exec(statement); err != nil {
		return err
	}

	return nil
}

func (available *AvailableInterview) create(db *sql.DB) error {
	insertStatement := fmt.Sprintf(` INSERT INTO Available VALUES (
		%d, '%s', '%s', %d, '%s', '%s')`, available.ID, available.Start, available.End,
		available.PositionID, available.Address, available.Room)
	if _, err := db.Exec(insertStatement); err != nil {
		return err
	}
	return nil
}

func BookInterview(db *sql.DB, interviewID, intervieweeID, agreementID int, nda, tou bool) error {
	available, err := getAvailable(db, interviewID)
	if err != nil {
		return fmt.Errorf("Unable to get interview: %v", err)
	}

	booked := BookedInterview{
		ID:            available.ID,
		Start:         available.Start,
		End:           available.End,
		PositionID:    available.PositionID,
		Address:       available.Address,
		Room:          available.Room,
		IntervieweeID: intervieweeID,
	}

	if err := booked.create(db); err != nil {
		return fmt.Errorf("unable to create booked: %v", err)
	}

	if err := updateConducts(db, interviewID, true); err != nil {
		return fmt.Errorf("Unable to update conduct table: %v", err)
	}

	if err := updateContains(db, interviewID, true); err != nil {
		return fmt.Errorf("unable to update contains table: %v", err)
	}

	if err := addAgreement(db, interviewID, agreementID, nda, tou); err != nil {
		return fmt.Errorf("unable to add agreement: %v", err)
	}

	if err := removeAvailable(db, interviewID); err != nil {
		return fmt.Errorf("Unable to remove available: %v", err)
	}

	return nil
}

func updateConducts(db *sql.DB, interviewID int, isToBooked bool) error {
	var updateStatement string
	if isToBooked {
		updateStatement = fmt.Sprintf(`UPDATE Conducts SET booked_interview_id=%d WHERE available_interview_id = %d`,
			interviewID, interviewID)
	} else {
		updateStatement = fmt.Sprintf(`UPDATE Conducts SET available_interview_id=%d WHERE booked_interview_id = %d`,
			interviewID, interviewID)
	}
	if _, err := db.Exec(updateStatement); err != nil {
		return err
	}
	return nil
}

func updateContains(db *sql.DB, interviewID int, isToBooked bool) error {
	var updateStatement string
	if isToBooked {
		updateStatement = fmt.Sprintf(`UPDATE Contains SET booked_interview_id=%d WHERE available_interview_id = %d`,
			interviewID, interviewID)
	} else {
		updateStatement = fmt.Sprintf(`UPDATE Contains SET available_interview_id=%d WHERE booked_interview_id = %d`,
			interviewID, interviewID)
	}
	if _, err := db.Exec(updateStatement); err != nil {
		return err
	}
	return nil
}

func addAgreement(db *sql.DB, interviewID, agreementID int, nda, tou bool) error {
	insertStatement := fmt.Sprintf(`INSERT INTO Agreement VALUES (%d, %d, %v, %v)`,
		agreementID, interviewID, nda, tou)
	if _, err := db.Exec(insertStatement); err != nil {
		return err
	}
	return nil
}

func (booked *BookedInterview) create(db *sql.DB) error {
	createStatement := fmt.Sprintf(`INSERT INTO Booked VALUES (
		%d, '%s', '%s', %d, '%s', '%s', %d)`, booked.ID, booked.Start,
		booked.End, booked.PositionID, booked.Address, booked.Room, booked.IntervieweeID)

	if _, err := db.Exec(createStatement); err != nil {
		return err
	}

	return nil
}

func removeAvailable(db *sql.DB, availableInterviewID int) error {
	removeStatement := fmt.Sprintf(`DELETE FROM Available
		WHERE id = %d`, availableInterviewID)
	if _, err := db.Exec(removeStatement); err != nil {
		return err
	}
	return nil
}

func getAvailable(db *sql.DB, id int) (*AvailableInterview, error) {
	queryStatement := fmt.Sprintf(`SELECT * FROM Available
	WHERE id = %d`, id)
	row := db.QueryRow(queryStatement)
	var available AvailableInterview
	if err := row.Scan(&available.ID, &available.Start,
		&available.End, &available.PositionID, &available.Address,
		&available.Room); err != nil {
		return nil, err
	}
	return &available, nil
}
