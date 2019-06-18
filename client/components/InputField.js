import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Row = styled.div`
  display: block;
  margin: 16px 0;
  width: 100%;
`;
const Input = styled(TextField)`
  display: block;
  margin: 8px;
  width: 500px;
`;

export default function InputField(props) {
  const [values, setValues] = React.useState({
    input: ""
  });

  const handleChange = input => event => {
    setValues({ ...values, [input]: event.target.value });
    const value = {};
    value[props.label] = event.target.value;
    props.onChange(value); 
  };

  return (
    <Row>
      <Input
        label={props.label}
        value={values.input}
        onChange={handleChange("input")}
        margin="normal"
      />
    </Row>
  );
}
