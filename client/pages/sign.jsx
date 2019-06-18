import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

export default class sign extends Component {

    static async getInitialProps({ query }) {
        return {
            interviewId: query.interviewId
        }
    }

    componentWillMount() {
        this.setState({
            nda: false,
            tou: false
        });
    }

    setNDA(event) {
        this.setState({
            ...this.state,
            nda: event.target.checked
        });
    }

    setTermsOfUse(event) {
        this.setState({
            ...this.state,
            tou: event.target.checked
        })
    }

    bookInterview() {
        const requestBody = {
            "agreement": {
                "nda": this.state.nda,
                "tou": this.state.tou,
            }
        };

        fetch("http://localhost:8080/interview/" + this.props.interviewId, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            response.json().then(data => {
                console.log("Booked!")
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Sign Agreement</h1>

                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox onChange={(event) => this.setNDA(event)} />
                        } label="Sign NDA"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox onChange={(event) => this.setTermsOfUse(event)} />
                        } label="Sign Terms of Use"
                    />
                </FormGroup>
                <Button variant="contained" onClick={() => this.bookInterview()}>Book interview!</Button>
            </div>
        )
    }
}
