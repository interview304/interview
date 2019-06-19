import React, { Component } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import Button from "@material-ui/core/Button";
import Router from "next/router";

const Container = styled.div`
  text-align: center;
`;

export default class Home extends Component {
  static async getInitialProps({ query }) {
    return {
      interviewId: query.interviewId
    };
  }

  setValue = value => {
    this.setState({
      ...this.state,
      ...value
    });
  };

  createInterviewee = () => {
    const requestBody = {
      ...this.state,
      status: "Unemployed",
      age: parseInt(this.state.age, 10)
    };

    const intervieweePromise = fetch("http://localhost:8080/interviewee", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(requestBody)
    }).then(response => {
      return response.json();
    });

    intervieweePromise.then(interviewee => {
      Router.push(
        "/confirm?interviewId=" +
          this.props.interviewId +
          "&intervieweeId=" +
          interviewee.id
      );
    });
  };
  render() {
    return (
      <Container>
        <h1>Please Fill Out Your Information</h1>
        <Form setValue={this.setValue} />
        <Button
          variant="contained"
          onClick={this.createInterviewee}
          color="primary"
        >
          Submit
        </Button>
      </Container>
    );
  }
}
