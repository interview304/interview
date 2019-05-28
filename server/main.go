package main

import (
	"io/ioutil"
	"log"
	"os"

	"github.com/interview304/interview/server/app"
)

const dropTable = `DROP TABLE IF EXISTS Contains, Agreement, Conducts, Interviewer, Booked, Interviewee, Available, Provides_Amenities, Location, Position, Questions, Duration, Role;`

func main() {

	application := app.App{}
	application.Initialize(
		os.Getenv("DB_NAME"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"))
	if err := application.ExecStatement(dropTable); err != nil {
		log.Fatalf("Could not drop table: %v", err)
	}
	query, err := ioutil.ReadFile("./init.sql")
	if err != nil {
		log.Fatalf("Could not read sql file %v", err)
	}
	queryStr := string(query)
	if err := application.ExecStatement(queryStr); err != nil {
		log.Fatalf("Could not execute init sql commands: %v", err)
	}

	insertQuery, err := ioutil.ReadFile("./insert.sql")
	if err != nil {
		log.Fatalf("Could not read insert sql file: %v", err)
	}
	insertQueryStr := string(insertQuery)
	if err := application.ExecStatement(insertQueryStr); err != nil {
		log.Fatalf("Could not execute insert sql commands: %v", err)
	}

	application.Run(os.Getenv("PORT"))
}
