package app

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type App struct {
	DB     *sql.DB
	Router *mux.Router
}

func (app *App) Initialize(dbname, username, password string) error {
	connectionStatement := fmt.Sprintf("user=%s dbname=%s password=%s sslmode=disable",
		username, dbname, password)
	var err error
	app.DB, err = sql.Open("postgres", connectionStatement)
	if err != nil {
		return err
	}
	app.Router = mux.NewRouter()
	app.setupHandlers()
	return nil
}

func (app *App) setupHandlers() {
	app.Router.HandleFunc("/", app.ExampleGetAllRowsHandler).Methods("GET")
	app.Router.HandleFunc("/", app.ExampleInsertRowHandler).Methods("POST")
	app.Router.HandleFunc("/{id}", app.ExampleDeleteRowByIdHandler).Methods("DELETE")
	app.Router.HandleFunc("/difficulty/{id}", app.GetQuestionDifficultyHandler).Methods("GET")
	app.Router.HandleFunc("/interviews", app.GetInterviewsHandler).Methods("GET")
}

func (app *App) Run(port string) error {
	return http.ListenAndServe(port, app.Router)
}

func (app *App) ExecStatement(statement string) error {
	if _, err := app.DB.Exec(statement); err != nil {
		return err
	}
	return nil
}
