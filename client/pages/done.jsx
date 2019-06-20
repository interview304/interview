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
            end: interviewData.end,
            location: interviewData.address + " room " + interviewData.room,
            interviewId: query.interviewId,
            intervieweeId: query.intervieweeId
        };
    }

    getDate() {
        return this.props.date.substring(0, 10);
    }
    
    getTime() {
        let start = this.formatTime(this.props.date.substring(11, 19));
        let end = this.formatTime(this.props.end.substring(11, 19));
    
        return start + " - " + end;
    }
    
    formatTime(time) {
        // Check correct time format and split into components
        time = time
          .toString()
          .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
        if (time.length > 1) {
          time = time.slice(1);
          time.splice(-1);
          time[5] = +time[0] < 12 ? " am" : " pm";
          time[0] = +time[0] % 12 || 12;
        }
        return time.join("");
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

                <h2>See you on {this.getDate()} from {this.getTime()} at {this.props.location}</h2>

                <Button variant="outlined" color="secondary" onClick={() => { this.removeBooking() }}> Delete Booking </Button>
                <Button variant="outlined" color="secondary" onClick={() => { this.goToStats() }}> See stats! </Button>
            </Container>
        )
    }
}