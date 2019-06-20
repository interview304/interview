import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import styled from "styled-components";

const FinalButton = styled(Button)`
  margin: 0 16px !important;
`;

const ButtonRow = styled.div`
  margin: 24px;
  text-align: center;
`;

export default class interviewer extends Component {
  static async getInitialProps({ query }) {
    const interviewers = await fetch("http://localhost:8080/interviewer", {
      method: "GET"
    }).then(response => {
      return response.json();
    });
    return {
      interviewers: interviewers,
      interviweeId: query.intervieweeId,
      interviewId: query.interviewId
    };
  }

  componentWillMount() {
    this.setState({
      interviews: []
    });
    this.isClicked = false;
  }

  getInterviewWithAllQuestions() {
    fetch("http://localhost:8080/interview/allquestions", {
      method: "GET"
    }).then(response => {
      response.json().then(data => {
        this.isClicked = true;
        this.setState({
          interviews: data
        });
      });
    });
  }

  goToDone = () => {
    Router.push(
      "/done?interviewId=" +
        this.props.interviewId +
        "&intervieweeId=" +
        this.props.interviweeId
    );
  };

  render() {
    return (
      <div>
        <h1>Average Difficulty for Each Interviewer</h1>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Average Difficulty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.interviewers.map(interviewer => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {interviewer.name}
                  </TableCell>
                  <TableCell align="right">{interviewer.role}</TableCell>
                  <TableCell align="right">{interviewer.difficulty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ButtonRow>
          <FinalButton
            color="primary"
            variant="outlined"
            onClick={() => this.getInterviewWithAllQuestions()}
          >
            Fun fact!
          </FinalButton>

          <FinalButton
            variant="outlined"
            color="secondary"
            onClick={() => this.goToDone()}
          >
            Go back to done page
          </FinalButton>
        </ButtonRow>
        <DivisionTable clicked={this.isClicked} items={this.state.interviews} />
      </div>
    );
  }
}

function DivisionTable(props) {
  const isClicked = props.clicked;
  if (isClicked) {
    return (
      <div>
        <h3>These interviews contain every question!</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Interview Start Time</TableCell>
              <TableCell>Interview End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(interview => (
              <TableRow>
                <TableCell>{interview.start}</TableCell>
                <TableCell>{interview.end}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    return null;
  }
}
