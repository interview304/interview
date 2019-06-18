import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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


    render() {
        return (
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
        );
    }
}

