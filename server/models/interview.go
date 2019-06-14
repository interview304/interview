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
