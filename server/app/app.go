package app

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type App struct {
	DB     *sql.DB
	Router *mux.Router
}

func (app *App) Initialize(dbname, username, password string) {
	connectionStatement := fmt.Sprintf("user=%s dbname=%s password=%s sslmode=disable",
		username, dbname, password)
	var err error
	app.DB, err = sql.Open("postgres", connectionStatement)
	if err != nil {
		log.Fatalf("Could not open database %s", err.Error())
	}
	app.Router = mux.NewRouter()
	app.setupHandlers()
}

func (app *App) setupHandlers() {
	app.Router.HandleFunc("/", app.HandlerNotImplemented).Methods("GET")
}

func (app *App) Run(port string) {
	log.Fatal(http.ListenAndServe(port, app.Router))
}

func (app *App) ExecStatement(statement string) error {
	if _, err := app.DB.Exec(statement); err != nil {
		return err
	}
	return nil
}
