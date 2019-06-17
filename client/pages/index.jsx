import React, { Component } from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Container = styled.div`
    text-align: center;
`;

const Dropdown = styled(Select)`
    display: block;
    margin: 80px 0;
`;

const GoButton = styled(Button)`
    display: block;
`;

const Heading = styled.h1`
    font-size: 56px;
`;

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Heading>Interview</Heading>
                <Dropdown name="name">
                    <MenuItem value={'Sales Associate'}>Sales Associate</MenuItem>
                    <MenuItem value={'Graphics Designer'}>Graphics Designer</MenuItem>
                    <MenuItem value={'Senior Backend Engineer'}>Senior Backend Engineer</MenuItem>
                    <MenuItem value={'Junior Frontend Engineer'}>Junior Frontend Engineer</MenuItem>
                    <MenuItem value={'Junior Data Science'}>Junior Data Science</MenuItem>
                </Dropdown>
                <br></br>
                <GoButton variant="contained" color="primary">Let's Go</GoButton>
            </Container>
        )
    }
}
