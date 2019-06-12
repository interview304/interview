package models

import (
	"database/sql"
	"fmt"
)

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
