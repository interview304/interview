import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InterviewTable from "../components/InterviewTable";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Container = styled.div`
  text-align: center;
  margin: auto;
`;

export default class Interviews extends Component {
  static async getInitialProps({ query }) {
    const interviews = await fetch(
      "http://localhost:8080/interview/" + query.position,
      {
        method: "GET"
      }
    ).then(response => {
      return response.json();
    });
    return {
      interviews: interviews,
      position: query.position
    };
  }

  constructor() {
    super();
    this.state = {
      clicked: false,
      location: false,
      openDialog: false
    };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      clicked: false,
      location: false,
      openDialog: false
    });
  }

  clickHandler(value) {
    this.setState({
      ...this.state,
      date: value
    });
    const start = value + " 00:00:00";
    const end = value + " 23:59:59";
    fetch(
      "http://localhost:8080/interview/min/" +
        start +
        "/" +
        end +
        "/" +
        this.props.position,
      {
        method: "GET"
      }
    ).then(response => {
      response.json().then(data => {
        this.setState({
          ...this.state,
          earliest: data.start
        });
      });
    });
  }

  handleInterviewee() {
    if(this.state.selectedInterview) {
      Router.push("/form?interviewId=" + this.state.selectedInterview);
    } else {
      this.setState({
        ...this.state,
        openDialog: true
      });
    }
  }

  setShowLocation(event) {
    this.setState({
      ...this.state,
      location: event.target.checked
    });
  }

  generateTable() {
    if(this.state.date) {
      this.setState({
        ...this.state,
        clicked: !this.state.clicked
      });
    } else {
        this.setState({
          ...this.state,
          openDialog: true
      });
    }
  }

  getDate() {
    let date = this.props.interview.start.substring(0, 10);
    return date;
  }

  getTime() {
    if(this.state.earliest) {
      return this.formatTime(this.state.earliest.substring(11, 19));
    }
  }

  formatTime(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time.splice(-1);
      time[5] = +time[0] < 12 ? " am" : " pm";
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }

  handleCloseDialog() {
    this.setState({
      ...this.state,
      openDialog: false
  });
  }

  clickInterview = interviewId => {
    this.setState({
      ...this.state,
      selectedInterview: interviewId
    });
    fetch("http://localhost:8080/difficulty/" + interviewId, {
      method: "GET"
    }).then(response => {
      response.json().then(data => {
        this.setState({
          ...this.state,
          difficulty: data.difficulty
        });
      });
    });
  };

  render() {
    let dates = this.props.interviews.map(interview => {
      return interview.start.substring(0, 10);
    });
    dates = [...new Set(dates)]; // get only unique dates

    const interviews = dates.map(date => {
      return (
        <Button
          disabled={this.state.date === date ? true : false}
          variant="outlined"
          color="primary"
          onClick={() => this.clickHandler(date)}
        >
          {date}
        </Button>
      );
    });
    return (
      <Container>
        <h2>Pick a Time and Location</h2>

        <div>{interviews}</div>

        <h4>
          Earliest interview in your selected date starts at:{" "}
          {this.getTime()}
        </h4>
        <FormGroup style={{ display: "block" }} row>
          <FormControlLabel
            control={
              <Checkbox onChange={event => this.setShowLocation(event)} />
            }
            label="Show location"
          />
        </FormGroup>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            this.generateTable();
          }}
        >
          Get Interviews!
        </Button>
        
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}>
            <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please choose a date before clicking 'Get Interviews!'.
                Please select an interview before proceeding to the next page.
              </DialogContentText>
            </DialogContent>
          </Dialog>

        <InterviewTable
          clicked={this.state.clicked}
          date={this.state.date}
          position={this.props.position}
          location={this.state.location}
          callback={this.clickInterview}
        />

        <h4>
          The interview you selected has difficulty: {this.state.difficulty}
        </h4>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            this.handleInterviewee();
          }}
        >
          Next
        </Button>
      </Container>
    );
  }
}
