package main

import (
	"io/ioutil"
	"log"
	"os"

	"github.com/interview304/interview/server/app"
)

func main() {

	application := app.App{}
	application.Initialize(
		os.Getenv("DB_NAME"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"))
	query, err := ioutil.ReadFile("./init.sql")
	if err != nil {
		log.Fatalf("Could not read sql file %s", err.Error())
	}
	queryStr := string(query)
	if err := application.ExecStatement(queryStr); err != nil {
		log.Fatalf("Could not execute init sql commands: %s", err.Error())
	}
	application.Run(os.Getenv("PORT"))
}
