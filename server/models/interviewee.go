package models

import (
	"database/sql"
	"fmt"

	"github.com/google/uuid"
)

type Interviewee struct {
	ID      uint16 `json:"id"`
	Phone   string `json:"phone_number"`
	Name    string `json:"name"`
	Status  string `json:"status"`
	Address string `json:"address"`
	Age     int    `json:"age"`
	Email   string `json:"email"`
}

func (interviewee *Interviewee) IntervieweeInsert(db *sql.DB) error {
	id, err := uuid.NewUUID()
	if err != nil {
		return fmt.Errorf("Unable to generate id for interviewee: %v", err)
	}
	interviewee.ID = uint16(id.ID())
	statement := fmt.Sprintf("INSERT INTO Interviewee VALUES ('%d', '%s', '%s', '%s', '%s', %d, '%s')", interviewee.ID, interviewee.Phone, interviewee.Name,
		interviewee.Status, interviewee.Address, interviewee.Age, interviewee.Email)
	if _, err := db.Exec(statement); err != nil {
		return err
	}
	return nil
}

func (interviewee *Interviewee) IntervieweeUpdate(db *sql.DB, id int) error {
	statement := fmt.Sprintf(`UPDATE Interviewee SET 
		phone_number='%s', name='%s', status='%s', address='%s', age=%d, email='%s'
		WHERE id = %d`, interviewee.Phone, interviewee.Name, interviewee.Status,
		interviewee.Address, interviewee.Age, interviewee.Email, id)
	if _, err := db.Exec(statement); err != nil {
		return err
	}
	return nil
}

func IntervieweeGet(db *sql.DB, id int) (*Interviewee, error) {
	query := fmt.Sprintf(`SELECT * FROM Interviewee WHERE (id = %d)`, id)
	row := db.QueryRow(query)
	var interviewee Interviewee
	if err := row.Scan(&interviewee.ID, &interviewee.Phone, &interviewee.Name, &interviewee.Status, 
		&interviewee.Address, &interviewee.Age, &interviewee.Email); err != nil {
		return nil, err
	}
	return &interviewee, nil	
}
