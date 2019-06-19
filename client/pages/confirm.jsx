import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Button from '@material-ui/core/Button'
import Router from 'next/router'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';


import '../public/styles/confirm.css';
import { CardContent } from '@material-ui/core';

export default class confirm extends Component {
    
    static async getInitialProps({ query }) {
        let interview;
        const interviewPromise = fetch("http://localhost:8080/interview/" + query.id , {
            method: "GET"
        }).then(async response => {
            data = await response.json();
            interview = data;
        });

        let interviewee;
        const intervieweePromise = fetch("http://localhost:8080/interviewee/" + query.id , {
            method: "GET"
        }).then(async response => {
            data = await response.json();
            interviewee = data;
        });

        return Promise.all([interviewPromise, intervieweePromise]).then(() => {
            console.log("INTERVIEW");
            console.log(interview);
            console.log("INTERVIEWEE");
            console.log(interviewee);
            return {
                interview: interview,
                interviewee: interviewee
            }
        })
    }
    render() {
        return (
            <div className="centerBody">
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Typography variant="h4" className="title" gutterBottom>
                            Confirm Your Details
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className="card" pb={2}>
                            <CardContent>
                            <Typography variant="h6" className="detailsText" fontWeight="700">Interview Details</Typography>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems = "center"
                            >
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography variant="button" className="detailName">Date</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body2" className="detailName">hi</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems = "center"
                            >
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography variant="button" className="detailName">Time</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body2" className="detailName">hi</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems = "center"
                            >
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography variant="button" className="detailName">Location</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body2" className="detailName">hi</Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="h6" className="detailsText" fontWeight="700">Personal Information</Typography>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems = "center"
                            >
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography variant="button" className="detailName">Name</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body2" className="detailName">hi</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems = "center"
                            >
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography variant="button" className="detailName">Phone</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body2" className="detailName">hi</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems = "center"
                            >
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography variant="button" className="detailName">Birth date</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body2" className="detailName">hi</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems = "center"
                            >
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography variant="button" className="detailName">Email</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body2" className="detailName">hi</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems = "center"
                            >
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Typography variant="button" className="detailName">Address</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body2" className="detailName">hi</Typography>
                                </Grid>
                            </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                    >
                        <Grid tem xs={2}></Grid>
                        <Grid item xs={3}>
                        <Button variant="outlined" color="primary">Go Back to Edit</Button>
                        </Grid>
                        <Grid tem xs={2}></Grid>
                        <Grid item xs={3} jutify="flex-end">
                        <Button variant="outlined" color="primary">Looks Great!</Button>
                        </Grid>
                        <Grid tem xs={2}></Grid>
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}