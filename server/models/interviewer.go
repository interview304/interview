package models

import (
	"database/sql"
	"fmt"
)

type Interviewer struct {
	ID         int     `json:"id"`
	Name       string  `json:"name"`
	Role       string  `json:"role"`
	Difficulty float64 `json:"difficulty"`
}

func GetInterviewers(db *sql.DB) ([]Interviewer, error) {
	statement := fmt.Sprintf(`
	SELECT sub.id as id, sub.name as name, sub.role as role, avg(sub.difficulty) as difficulty
	FROM 
		(SELECT ir.id as id, ir.name as name, ir.role as role, avg(q.difficulty) as difficulty
		FROM Interviewer ir, Conducts cd, Contains cn, Questions q
		WHERE ir.id = cd.interviewer_id AND cd.available_interview_id = cn.available_interview_id AND
			cn.question_id = q.id
		GROUP BY ir.id, ir.role, ir.name
		UNION
		SELECT ir.id as id, ir.name as name, ir.role as role, avg(q.difficulty) as dfficulty
		FROM Interviewer ir, Conducts cd, Contains cn, Questions q
		WHERE ir.id = cd.interviewer_id AND cd.booked_interview_id = cn.booked_interview_id AND
			cn.question_id = q.id
		GROUP BY ir.id, ir.name, ir.role) sub
	GROUP BY sub.id, sub.name, sub.role
	`)

	rows, err := db.Query(statement)
	if err != nil {
		return nil, err
	}

	interviewers := []Interviewer{}
	for rows.Next() {
		var interviewer Interviewer
		if err := rows.Scan(&interviewer.ID, &interviewer.Name,
			&interviewer.Role, &interviewer.Difficulty); err != nil {
			return nil, err
		}

		interviewers = append(interviewers, interviewer)
	}

	return interviewers, nil
}
