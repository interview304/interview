import React, { Component } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import Button from "@material-ui/core/Button";
import Router from "next/router";

const Container = styled.div`
  text-align: center;
`;

export default class EditFormPage extends Component {
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

  render() {
    return (
      <Container>
        <h1>Edit Your Information</h1>
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
