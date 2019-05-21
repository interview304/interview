package app

import (
	"encoding/json"
	"net/http"
)

func (app *App) HandlerNotImplemented(writer http.ResponseWriter, request *http.Request) {
	respondWithJSON(writer, http.StatusOK, map[string]string{"result": "not implemented"})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers",
		"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.WriteHeader(code)
	w.Write(response)
}
