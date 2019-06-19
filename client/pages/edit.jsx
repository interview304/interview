import React, { Component } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import fetch from "isomorphic-unfetch";

const Container = styled.div`
  text-align: center;
`;

export default class EditFormPage extends Component {
  static async getInitialProps({ query }) {
    const intervieweeInfo = await fetch(
      "http://localhost:8080/interviewee/" + query.intervieweeId,
      {
        method: "GET"
      }
    ).then(response => {
      return response.json();
    });
    return {
      intervieweeInfo: { ...intervieweeInfo },
      intervieweeId: query.intervieweeId,
      interviewId: query.interviewId
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.props.intervieweeInfo
    };
  }

  setValue = value => {
    this.setState({
      ...this.state,
      ...value
    });
  };

  editInterviewee = () => {
    const requestBody = {
      ...this.state,
      status: "Unemployed",
      age: parseInt(this.state.age, 10)
    };

    const intervieweePromise = fetch(
      "http://localhost:8080/interviewee/" + this.props.intervieweeId,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(requestBody)
      }
    ).then(response => {
      return response.json();
    });

    intervieweePromise.then(() => {
      Router.push(
        "/confirm?interviewId=" +
          this.props.interviewId +
          "&intervieweeId=" +
          this.props.intervieweeId
      );
    });
  };

  render() {
    return (
      <Container>
        <h1>Edit Your Information</h1>
        <Form interviewee={{ ...this.state }} setValue={this.setValue} />
        <Button
          onClick={this.editInterviewee}
          color="secondary"
          variant="outlined"
        >
          Submit
        </Button>
      </Container>
    );
  }
}
