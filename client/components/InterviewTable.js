import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'


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

    setSelected(interviewId) {
        this.setState({
            ...this.state,
            selected: interviewId
        });
        this.props.callback(interviewId);
    }
    getDateTime(ts) {
        let date = this.getDate();
        let time = this.getTime();
        return date + " " + time;
    }

    getDate(ts) {
        if (ts) {
            return ts.substring(0, 10);
        }
    }
    
    getTime(ts) {
        if(ts) {
            return this.formatTime(ts.substring(11, 19));
        }
        
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

    render() {
        if (this.props.clicked) {
            if (this.props.location) {
                return (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Select Interview</TableCell>
                                <TableCell>Interview start timestamp</TableCell>
                                <TableCell>Interview end timestamp</TableCell>
                                <TableCell>Interview Address</TableCell>
                                <TableCell>Interview Room</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.interviews.map(interview => (
                                    <TableRow >
                                        <TableCell>
                                            <Button onClick={() => { this.setSelected(interview.id) }}
                                                disabled={this.state.selected === interview.id}
                                                variant="outlined" color="primary" >
                                                Select
                                            </Button>
                                        </TableCell>
                                        <TableCell>{this.getDateTime(interview.start)}</TableCell>
                                        <TableCell>{this.getDateTime(interview.end)}</TableCell>
                                        <TableCell>{interview.address}</TableCell>
                                        <TableCell>{interview.room}</TableCell>
                                    </TableRow>
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
                                <TableCell>Select Interview</TableCell>
                                <TableCell>Interview start timestamp</TableCell>
                                <TableCell>Interview end timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.interviews.map((interview, index) => (
                                    <TableRow>
                                        <TableCell>
                                            <Button onClick={() => { this.setSelected(interview.id) }}
                                                disabled={this.state.selected === interview.id}
                                                variant="outlined" color="primary" >
                                                Select
                                            </Button>
                                        </TableCell>
                                        <TableCell>{this.getDateTime(interview.start)}</TableCell>
                                        <TableCell>{this.getDateTime(interview.end)}</TableCell>
                                    </TableRow>
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