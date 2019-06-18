import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Button from '@material-ui/core/Button'
import Router from 'next/router'

export default class Interviews extends Component {

    static async getInitialProps({ query }) {
        // query.date will be "yyyy-dd-mm"
        const start = query.date + " 00:00:00";
        const end = query.date + " 23:59:59";
        const interviews = await fetch("http://localhost:8080/interview/" + start + "/" + end, {
            method: "GET"
        }).then(response => {
            return response.json()
        })
        return {
            interviews: interviews,
            date: query.date
        }

    }

    componentWillMount() {

    }

    clickHandler(value) {
        this.setState({
            interview: value
        });
    }

    handleInterviewee() {
        Router.push("/interviewee?interview=" + this.state.interview)
    }

    render() {
        const interviews = this.props.interviews.map(interview => {
            return <Interview value={interview} onInterviewClick={(value) => this.clickHandler(value)} />
        });
        return (
            <div>
                <h2>Pick a Time and Location</h2>

                <h3>Date selected: {this.props.date}</h3>

                <div>{interviews}</div>
                <Button onClick={() => { this.handleInterviewee() }}>
                    Go
                </Button>
            </div >

        )
    }
}

class Interview extends Component {

    handleClick(value) {
        this.props.onInterviewClick(value)
    }

    render() {
        return (
            <p onClick={() => this.handleClick(this.props.value.id)}>{this.props.value.start}</p>
        )
    }
}

