package models

// =================== Example on queries related to any table ===================

import (
	"database/sql"
	"fmt"
)

// Note that ID is capitalized and the attributes in json are not
type Example struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Age    int    `json:"age"`
	Height int    `json:"height"`
}

func ExampleQueryOneRow(db *sql.DB, arg interface{} /* replace with appropriate arguments if needed */) (*Example, error) {
	row := db.QueryRow("SELECT * FROM example") // Queries one row, only use this if you are expecting exactly one row
	var example Example
	if err := row.Scan(&example.ID, &example.Name, &example.Age, &example.Height); err != nil {
		return nil, err
	}
	return &example, nil
}

func ExampleQueryManyRows(db *sql.DB, arg interface{} /* replace with appropriate arguments if needed */) ([]Example, error) {
	rows, err := db.Query("SELECT * FROM example")
	if err != nil {
		return nil, err
	}
	examples := []Example{}
	for rows.Next() { // Will iterate over all rows
		var example Example
		if err := rows.Scan(&example.ID, &example.Name, &example.Age, &example.Height); err != nil { // scans the current row to the variable
			return nil, err
		}
		examples = append(examples, example)
	}
	return examples, nil
}

func (example *Example) ExampleAddRow(db *sql.DB) error {
	statement := fmt.Sprintf("INSERT INTO example VALUES (%d, '%s', %d, %d)", example.ID, example.Name,
		example.Age, example.Height)
	if _, err := db.Exec(statement); err != nil {
		return err
	}
	return nil
}

func ExampleDeleteRowById(db *sql.DB, id int) error {
	statement := fmt.Sprintf("DELETE FROM example WHERE id = %d", id)
	if _, err := db.Exec(statement); err != nil {
		return err
	}
	return nil
}
