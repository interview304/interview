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
	app.Router.HandleFunc("/interviewee", app.IntervieweeCreateUser).Methods("POST")
	app.Router.HandleFunc("/interviewee/{id}", app.IntervieweeUpdateInfo).Methods("PUT")
	app.Router.HandleFunc("/interviewee/{id}", app.IntervieweeGetInfo).Methods("GET")
	app.Router.HandleFunc("/interviewee/{id}", app.PreflightHandler).Methods("OPTIONS")
	app.Router.HandleFunc("/difficulty/{id}", app.GetQuestionDifficultyHandler).Methods("GET")
	app.Router.HandleFunc("/interview/{start}/{end}/{position}", app.GetInterviewsHandler).Methods("GET")
	app.Router.HandleFunc("/interview/min/{start}/{end}/{position}", app.GetMinimumTimeHandler).Methods("GET")
	app.Router.HandleFunc("/interview/location/{start}/{end}/{position}", app.GetInterviewsWithLocationHandler).Methods("GET")
	app.Router.HandleFunc("/interview", app.GetAllInterviews).Methods("GET")
	app.Router.HandleFunc("/interview/{position}", app.GetInterviewsByPosition).Methods("GET")
	app.Router.HandleFunc("/interview/allquestions", app.GetInterviewsWithEveryQuestionHandler).Methods("GET")
	app.Router.HandleFunc("/interview/{id}", app.DeleteInterviewHandler).Methods("DELETE")
	app.Router.HandleFunc("/interview/{id}", app.PreflightHandler).Methods("OPTIONS")
	app.Router.HandleFunc("/interview/{id}", app.BookInterview).Methods("POST")
	app.Router.HandleFunc("/interview/id/{id}", app.GetInterviewById).Methods("GET")
	app.Router.HandleFunc("/interviewer", app.GetInterviewer).Methods("GET")
}

func (app *App) PreflightHandler(writer http.ResponseWriter, request *http.Request) {
	respondWithJSON(writer, http.StatusOK, map[string]string{"status": "ok"})
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
