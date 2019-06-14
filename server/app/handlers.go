package app

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/interview304/interview/server/models"
)

// ======================= START OF EXAMPLES for http handlers ======================

func (app *App) ExampleGetAllRowsHandler(writer http.ResponseWriter, request *http.Request) {
	examples, err := models.ExampleQueryManyRows(app.DB, nil)
	if err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusOK, examples)
}

func (app *App) ExampleInsertRowHandler(writer http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var example models.Example
	if err := decoder.Decode(&example); err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
	}
	if err := example.ExampleAddRow(app.DB); err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
	}
	respondWithJSON(writer, http.StatusCreated, example)
}

func (app *App) ExampleDeleteRowByIdHandler(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	idStr := vars["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
	}
	if err = models.ExampleDeleteRowById(app.DB, id); err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
	}
	respondWithJSON(writer, http.StatusOK, map[string]string{"result": "success"})
}

// ===================== END OF EXAMPLES ===========================

func (app *App) IntervieweeCreateUser(writer http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var interviewee models.Interviewee
	if err := decoder.Decode(&interviewee); err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
	}
	if err := interviewee.IntervieweeInsert(app.DB); err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
	}
	respondWithJSON(writer, http.StatusCreated, interviewee)
}

func (app *App) IntervieweeUpdateInfo(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	idStr := vars["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
	}

	decoder := json.NewDecoder(request.Body)
	var interviewee models.Interviewee	
	if err := decoder.Decode(&interviewee); err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
	}
	if err := interviewee.IntervieweeUpdate(app.DB, id); err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
	}
	respondWithJSON(writer, http.StatusOK, map[string]string{"updated": "success"}, Interviewee)
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	setHeader(w)
	w.WriteHeader(code)
	w.Write(response)
}

func respondWithError(w http.ResponseWriter, code int, err error) {
	respondWithJSON(w, code, map[string]string{"error": err.Error()})
}

func setHeader(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers",
		"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
