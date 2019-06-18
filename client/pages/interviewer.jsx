import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import fetch from 'isomorphic-unfetch'

export default class interviewer extends Component {
    static async getInitialProps() {
        const interviewers = await fetch("http://localhost:8080/interviewer", {
            method: "GET"
        }).then(response => {
            return response.json();
        });
        return {
            interviewers: interviewers
        };
    }

    componentWillMount() {
        this.setState({
            interviews: []
        });
        this.isClicked = false;
    }

    getInterviewWithAllQuestions() {
        fetch("http://localhost:8080/interview/allquestions", {
            method: "GET"
        }).then(response => {
            response.json().then(data => {
                this.isClicked = true;
                this.setState({
                    interviews: data
                });
            });
        });
    }

    render() {

        const divisionInterviews = this.state.interviews.map(interview => (
            <p>{interview.start}</p>
        ));

        return (
            <div>
                <div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Average Difficulty</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.interviewers.map(interviewer => (
                                <TableRow>
                                    <TableCell component="th" scope="row">{interviewer.name}</TableCell>
                                    <TableCell align="right">{interviewer.role}</TableCell>
                                    <TableCell align="right">{interviewer.difficulty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Button onClick={() => this.getInterviewWithAllQuestions()}>Fun fact!</Button>

                <DivisionTable clicked={this.isClicked} items={this.state.interviews} />
            </div>
        );
    }
}

function DivisionTable(props) {
    const isClicked = props.clicked;
    if (isClicked) {
        return (
            <div>
                <h3>Those interviews had all questions!!</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Interview Start Time</TableCell>
                            <TableCell>Interview End Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.items.map(interview => (
                            <TableRow>
                                <TableCell>{interview.start}</TableCell>
                                <TableCell>{interview.end}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        );
    } else {
        return null;
    }
}

