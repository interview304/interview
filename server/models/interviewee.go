package models

import (
	"database/sql"
	"fmt"
)

type Interviewee struct {
	ID		int    `json:"id"`
	Phone	string `json:"phone_number"`
	Name	string `json:"name"`
	Status	string `json:"status"`
	Address	string `json:"address"`
	Age		int    `json:"age"`
	Email	string `json:"email"`
}

func (interviewee *Interviewee) IntervieweeInsert(db *sql.DB) error {
	statement := fmt.Sprintf("INSERT INTO interviewee VALUES ('%s', '%s', '%s', '%s', %d, '%s')", interviewee.Phone, interviewee.Name,
		interviewee.Status, interviewee.Address, interviewee.Age, interviewee.Email)
	if _, err := db.Exec(statement); err != nil {
		return err
	}
	return nil
}

func (interviewee *Interviewee) IntervieweeUpdate(db *sql.DB, id int) error {
	statement := fmt.Sprintf("UPDATE 'interviewee' SET phone_number='%s', name='%s', status='%s', address='%s', age=%d, email='%s') WHERE id = %d", 
	interviewee.Phone, interviewee.Name, interviewee.Status, interviewee.Address, interviewee.Age, interviewee.Email, interviewee.ID)
	if _, err := db.Exec(statement); err != nil {
		return err
	}
	return nil
}

