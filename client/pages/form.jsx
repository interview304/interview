import React, { Component } from "react";
import styled from "styled-components";
import InputField from "../components/InputField";
import Button from "@material-ui/core/Button";

const Container = styled.div`
  text-align: center;
`;

export default class Home extends Component {
  setValue = (value) => {
    this.setState({
        ...this.state,
        ...value
    })
  }
  render() {
    return (
      <Container>
        <h1>Please Fill Out Your Information</h1>
        <form>
          <InputField onChange={this.setValue} label="Name" />
          <InputField onChange={this.setValue} label="Email" />
          <InputField onChange={this.setValue} label="Phone Number" />
          <InputField onChange={this.setValue} label="Age" />
          <InputField onChange={this.setValue} label="Address" />
        </form>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Container>
    );
  }
}
