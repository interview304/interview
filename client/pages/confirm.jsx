import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import "../public/styles/confirm.css";
import { CardContent } from "@material-ui/core";

export default class confirm extends Component {
  static async getInitialProps({ query }) {
    let interview;
    const interviewPromise = fetch(
      "http://localhost:8080/interview/id/" + query.interviewId,
      {
        method: "GET"
      }
    ).then(async response => {
      let data = await response.json();
      interview = data;
    });

    let interviewee;
    const intervieweePromise = fetch(
      "http://localhost:8080/interviewee/" + query.intervieweeId,
      {
        method: "GET"
      }
    ).then(async response => {
      let data = await response.json();
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
      };
    });
  }
  getDate() {
    let date = this.props.interview.start.substring(0, 10);
    return date;
  }

  getTime() {
    let start = this.formatTime(this.props.interview.start.substring(11, 19));
    let end = this.formatTime(this.props.interview.end.substring(11, 19));

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

  gotoEditPage() {
    //Router.push("/interviews" + );
  }

  gotoSignPage() {
    Router.push(
      "/sign?interviewId=" +
        this.props.interview.id +
        "&intervieweeId=" +
        this.props.interviewee.id
    );
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
                <Typography
                  variant="h6"
                  className="detailsText"
                  fontWeight="700"
                >
                  Interview Details
                </Typography>
                <hr />
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography variant="button" className="detailName">
                      Date
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" className="detailName">
                      {this.getDate()}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography variant="button" className="detailName">
                      Time
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" className="detailName">
                      {this.getTime()}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography variant="button" className="detailName">
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" className="detailName">
                      {this.props.interview.address}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography variant="button" className="detailName">
                      Room
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" className="detailName">
                      {this.props.interview.room}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <br />
                <Typography
                  variant="h6"
                  className="detailsText"
                  fontWeight="700"
                >
                  Personal Information
                </Typography>
                <hr />
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography variant="button" className="detailName">
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" className="detailName">
                      {this.props.interviewee.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography variant="button" className="detailName">
                      Phone
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" className="detailName">
                      {this.props.interviewee.phone_number}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography variant="button" className="detailName">
                      Age
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" className="detailName">
                      {this.props.interviewee.age}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography variant="button" className="detailName">
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" className="detailName">
                      {this.props.interviewee.email}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <Typography variant="button" className="detailName">
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" className="detailName">
                      {this.props.interviewee.address}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                this.gotoEditPage();
              }}
              variant="outlined"
              color="primary"
            >
              Go Back to Edit
            </Button>
            <Button
              onClick={() => {
                this.gotoSignPage();
              }}
              variant="outlined"
              color="primary"
            >
              Looks Great!
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
