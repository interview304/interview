import React, { Component } from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
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
    
    setSelected(positionName) {
        this.setState({
            selected: positionName
        });
    }
    
    render() {
        return (
            <Container>
                <Heading>Interview</Heading>
                <Dropdown callback={(positionName) => this.setSelected(positionName)}/>
                <br></br>
                <GoButton variant="contained" color="primary">Let's Go</GoButton>
            </Container>
        )
    }
}
