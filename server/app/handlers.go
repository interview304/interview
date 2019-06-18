package app

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/interview304/interview/server/models"
)

func (app *App) DeleteInterviewHandler(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	idStr := vars["id"]
	interviewID, err := strconv.Atoi(idStr)
	if err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
		return
	}
	if err := models.DeleteInterview(app.DB, interviewID); err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusOK, map[string]string{"deleted": "success"})
}

func (app *App) GetQuestionDifficultyHandler(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	idStr := vars["id"]
	interviewID, err := strconv.Atoi(idStr)
	if err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
		return
	}
	difficulty, err := models.GetQuestionDifficulty(app.DB, interviewID)
	if err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusOK, map[string]string{"difficulty": difficulty})
}

func (app *App) GetInterviewsWithEveryQuestionHandler(writer http.ResponseWriter, request *http.Request) {
	interviews, err := models.GetInterviewsWithEveryQuestion(app.DB)
	if err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusOK, interviews)
}

func (app *App) GetAllInterviews(writer http.ResponseWriter, request *http.Request) {
	startTime := "2000-01-01 10:00:00"
	endTime := "2109-05-25 13:00:00"
	interviews, err := models.GetInterviews(app.DB, startTime, endTime)
	if err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusOK, interviews)
}

func (app *App) GetInterviewsHandler(writer http.ResponseWriter, request *http.Request) {

	vars := mux.Vars(request)
	start := vars["start"]
	end := vars["end"]

	startTime, _ := url.QueryUnescape(start)
	endTime, _ := url.QueryUnescape(end)

	interviews, err := models.GetInterviews(app.DB, startTime, endTime)
	if err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusOK, interviews)
}

func (app *App) IntervieweeCreateUser(writer http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	defer request.Body.Close()
	var interviewee models.Interviewee
	if err := decoder.Decode(&interviewee); err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
		return
	}
	if err := interviewee.IntervieweeInsert(app.DB); err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusCreated, interviewee)
}

func (app *App) IntervieweeUpdateInfo(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	idStr := vars["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
		return
	}

	decoder := json.NewDecoder(request.Body)
	var interviewee models.Interviewee
	if err := decoder.Decode(&interviewee); err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
		return
	}
	if err := interviewee.IntervieweeUpdate(app.DB, id); err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusOK, map[string]string{"updated": "success"})
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
	w.Header().Set("Access-Control-Allow-Methods", "*")
	w.Header().Set("Access-Control-Allow-Headers",
		"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

type BookRequestBody struct {
	IntervieweeID int `json:"interviewee"`
	Agreement     struct {
		Nda bool `json:"nda"`
		Tou bool `json:"tou"`
	} `json:"agreement"`
}

func (app *App) BookInterview(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	interviewID, err := strconv.Atoi(id)
	if err != nil {
		respondWithError(writer, http.StatusBadRequest, err)
		return
	}

	var bookRequestBody BookRequestBody
	decoder := json.NewDecoder(request.Body)
	defer request.Body.Close()
	decoder.Decode(&bookRequestBody)
	if err := models.BookInterview(app.DB, interviewID, bookRequestBody.IntervieweeID,
		bookRequestBody.Agreement.Nda,
		bookRequestBody.Agreement.Tou); err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusOK, map[string]string{"booked": "success"})
}

func (app *App) GetInterviewer(writer http.ResponseWriter, request *http.Request) {
	interviewers, err := models.GetInterviewers(app.DB)
	if err != nil {
		respondWithError(writer, http.StatusInternalServerError, err)
		return
	}
	respondWithJSON(writer, http.StatusOK, interviewers)
}
