import React from "react";
import Input from "./InputField";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const Form = (props) => (
  <form>
    <Input onChange={this.setValue} jsonLabel="name" label="Name" />
    <Input onChange={this.setValue} jsonLabel="email" label="Email" />
    <Input onChange={this.setValue} jsonLabel="phone_number" label="Phone Number" />
    <Input onChange={this.setValue} jsonLabel="age" label="Age" />
    <Input onChange={this.setValue} jsonLabel="address" label="Address" />
  </form>
);

export default Form;
