import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from "styled-components";


const InterviewRow = styled(TableRow)`
    cursor: pointer;
`;

export default class InterviewTable extends Component {
    date;
    clicked;
    showLocation;
    componentDidMount() {
        if (this.props.date === this.date && this.props.clicked === this.clicked && this.props.location === this.showLocation) {
            return;
        }
        if (this.props.clicked) {
            const start = this.props.date + " 00:00:00";
            const end = this.props.date + " 23:59:59";
            if (this.props.location) {
                fetch("http://localhost:8080/interview/location/" + start + "/" + end + "/" + this.props.position, {
                    method: "GET",
                }).then(response => {
                    response.json().then(data => {
                        this.date = this.props.date;
                        this.clicked = this.props.clicked;
                        this.showLocation = this.props.location;
                        this.setState({
                            ...this.state,
                            interviews: [...data]
                        });
                    });
                });
            } else {
                fetch("http://localhost:8080/interview/" + start + "/" + end + "/" + this.props.position, {
                    method: "GET",
                }).then(response => {
                    response.json().then(data => {
                        this.date = this.props.date;
                        this.clicked = this.props.clicked;
                        this.showLocation = this.props.location
                        this.setState({
                            ...this.state,
                            interviews: [...data]
                        });
                    });
                });
            }
        } else {
            this.setState({
                ...this.state,
                interviews: []
            });
        }
    }

    componentDidUpdate() {
        if (this.props.date === this.date && this.props.clicked === this.clicked && this.props.location === this.showLocation) {
            return;
        }
        if (this.props.clicked) {
            const start = this.props.date + " 00:00:00";
            const end = this.props.date + " 23:59:59";
            if (this.props.location) {
                fetch("http://localhost:8080/interview/location/" + start + "/" + end + "/" + this.props.position, {
                    method: "GET",
                }).then(response => {
                    response.json().then(data => {
                        this.date = this.props.date;
                        this.clicked = this.props.clicked;
                        this.showLocation = this.props.location;
                        this.setState({
                            ...this.state,
                            interviews: [...data]
                        });
                    });
                });
            } else {
                fetch("http://localhost:8080/interview/" + start + "/" + end + "/" + this.props.position, {
                    method: "GET",
                }).then(response => {
                    response.json().then(data => {
                        this.date = this.props.date;
                        this.clicked = this.props.clicked;
                        this.showLocation = this.props.location
                        this.setState({
                            ...this.state,
                            interviews: [...data]
                        });
                    });
                });
            }
        }
    }

    render() {
        if (this.props.clicked) {
            if (this.props.location) {
                return (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Interview start timestamp</TableCell>
                                <TableCell>Interview end timestamp</TableCell>
                                <TableCell>Interview Address</TableCell>
                                <TableCell>Interview Room</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.interviews.map(interview => (
                                    <InterviewRow onClick={() => { this.props.callback(interview.id) }}>
                                        <TableCell>{interview.start}</TableCell>
                                        <TableCell>{interview.end}</TableCell>
                                        <TableCell>{interview.address}</TableCell>
                                        <TableCell>{interview.room}</TableCell>
                                    </InterviewRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                );
            } else {
                return (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Interview start timestamp</TableCell>
                                <TableCell>Interview end timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.interviews.map(interview => (
                                    <InterviewRow onClick={() => { this.props.callback(interview.id) }}>
                                        <TableCell>{interview.start}</TableCell>
                                        <TableCell>{interview.end}</TableCell>
                                    </InterviewRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                );
            }
        } else {
            return null;
        }
    }
}