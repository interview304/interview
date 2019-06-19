import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Router from "next/router";
//import fetch from 'isomorphic-unfetch'
export default class done extends Component {
  static async getInitialProps({ query }) {
    return {
      interviewId: 1
    };
  }

  goEdit() {
    Router.push("/edit?id=" + this.props.intervieweeId);
  }

  removeBooking() {
    fetch("http://localhost:8080/interview/1", {
      method: "DELETE"
    })
      .then(response => {
        response.json().then(data => {
          console.log(data);
        });
        Router.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h3>Success!</h3>

        <h2>
          See you at on {this.props.date} at {this.props.location}
        </h2>

        <Button
          onClick={() => {
            this.goEdit();
          }}
        >
          {" "}
          Edit personal information{" "}
        </Button>
        <Button
          onClick={() => {
            this.removeBooking();
          }}
        >
          {" "}
          Delete Booking{" "}
        </Button>
      </div>
    );
  }
}
