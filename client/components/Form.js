import React from "react";
import Input from "./InputField";
import styled from "styled-components";

const Container = styled.form`
  margin-bottom: 24px;
`;

const Form = props => (
  <Container>
    <Input
      default={props.interviewee.name}
      onChange={props.setValue}
      jsonLabel="name"
      label="Name"
    />
    <Input
      default={props.interviewee.email}
      onChange={props.setValue}
      jsonLabel="email"
      label="Email"
    />
    <Input
      default={props.interviewee.phone_number}
      onChange={props.setValue}
      jsonLabel="phone_number"
      label="Phone Number"
    />
    <Input
      default={props.interviewee.age}
      onChange={props.setValue}
      jsonLabel="age"
      label="Age"
    />
    <Input
      default={props.interviewee.address}
      onChange={props.setValue}
      jsonLabel="address"
      label="Address"
    />
  </Container>
);

export default Form;
