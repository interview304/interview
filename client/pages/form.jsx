import React, { Component } from "react";
import styled from "styled-components";
import InputField from "../components/InputField";

const Container = styled.div`
  text-align: center;
`;

export default class Home extends Component {
  render() {
    return (
      <Container>
        <form>
          <InputField label="Name" />
          <InputField label="Email" />
          <InputField label="Phone Number" />
          <InputField label="Age" />
          <InputField label="Address" />
        </form>
      </Container>
    );
  }
}
