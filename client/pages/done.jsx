import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Router from 'next/router'
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch'


const Container = styled.div`
    text-align: center;
`;
export default class done extends Component {


    static async getInitialProps({ query }) {
        const interviewData = await fetch("http://localhost:8080/interview/id/" + query.interviewId)
            .then(response => {
                return response.json();
            });
        return {
            date: interviewData.start,
            location: interviewData.address + " room " + interviewData.room,
            interviewId: query.interviewId,
            intervieweeId: query.intervieweeId
        };
    }

    goToStats() {
        Router.push("/interviewer?interviewId=" + this.props.interviewId + "&intervieweeId=" + this.props.intervieweeId);
    }

    removeBooking() {
        fetch("http://localhost:8080/interview/" + this.props.interviewId, {
            method: "DELETE"
        }).then(response => {
            response.json().then(data => {
                console.log(data);
            })
            Router.push("/");
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return (
            <Container>
                <h3>Success!</h3>

                <h2>See you on {this.props.date} at {this.props.location}</h2>

                <Button variant="outlined" color="secondary" onClick={() => { this.removeBooking() }}> Delete Booking </Button>
                <Button variant="outlined" color="secondary" onClick={() => { this.goToStats() }}> See stats! </Button>
            </Container>
        )
    }
}