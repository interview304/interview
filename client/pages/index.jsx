import React, { Component } from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PositionDropdown from '../components/PositionDropdown';

const Container = styled.div`
    text-align: center;
`;

const Dropdown = styled(PositionDropdown)`
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
                <Dropdown>
                    <MenuItem value={'Sales Associate'}>Sales Associate</MenuItem>
                    <MenuItem value={'Graphics Designer'}>Graphics Designer</MenuItem>
                    <MenuItem value={'Backend Engineer'}>Backend Engineer</MenuItem>
                    <MenuItem value={'Frontend Engineer'}>Frontend Engineer</MenuItem>
                    <MenuItem value={'Data Science'}>Data Science</MenuItem>
                </Dropdown>
                <br></br>
                <GoButton variant="contained" color="primary">Let's Go</GoButton>
            </Container>
        )
    }
}
