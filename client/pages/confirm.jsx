import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Button from '@material-ui/core/Button'
import Router from 'next/router'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';


import '../public/styles/confirm.css';

export default class confirm extends Component {
    
    // static async getInitialProps() {
    //     let interview;
    //     const interviewPromise = fetch("http://localhost:8080/interview/" + id , {
    //         method: "GET"
    //     }).then(async response => {
    //         data = await response.json();
    //         interview = data;
    //     });
    //     let interviewee;
    //     const intervieweePromise = fetch("http://localhost:8080/interviewee/" + id , {
    //         method: "GET"
    //     }).then(response => {
    //         return response.json().then(data => {
    //             interviewee = data;
    //         });
    //     });
    //     return Promise.all([interviewPromise, intervieweePromise]).then(() => {
    //         return {
    //             interview: interview,
    //             interviewee: interviewee
    //         }
    //     })
    // }
    render() {
        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    Information Review
                </Typography>
                <Card className="card">
                    <Typography>Hello</Typography>
                </Card>
            </div>
        )
    }
}