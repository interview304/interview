import React from "react";
import Input from "./InputField";
import styled from "styled-components";

const Container = styled.form`
  margin-bottom: 24px;
`;

const Form = props => (
  <Container>
    <Input onChange={props.setValue} jsonLabel="name" label="Name" />
    <Input onChange={props.setValue} jsonLabel="email" label="Email" />
    <Input
      onChange={props.setValue}
      jsonLabel="phone_number"
      label="Phone Number"
    />
    <Input onChange={props.setValue} jsonLabel="age" label="Age" />
    <Input onChange={props.setValue} jsonLabel="address" label="Address" />
  </Container>
);

export default Form;
