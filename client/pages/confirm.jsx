import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { CardContent } from "@material-ui/core";
import styled from "styled-components";

const DetailName = styled(Typography)`
  margin-bottom: 3%;
`;

const DetailText = styled(Typography)`
  padding: 3% 1% 0 1%;
`;

const NiceCard = styled(Card)`
  min-width: 65vw;
`;

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
    Router.push(
      "/edit?interviewId=" +
        this.props.interview.id +
        "&intervieweeId=" +
        this.props.interviewee.id
    );
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
            <Typography variant="h4" gutterBottom>
              Confirm Your Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <NiceCard pb={2}>
              <CardContent>
                <DetailText variant="h6" fontWeight="700">
                  Interview Details
                </DetailText>
                <hr />
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <DetailName variant="button">Date</DetailName>
                  </Grid>
                  <Grid item xs={7}>
                    <DetailName variant="body2">{this.getDate()}</DetailName>
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
                    <DetailName variant="button">Time</DetailName>
                  </Grid>
                  <Grid item xs={7}>
                    <DetailName variant="body2">{this.getTime()}</DetailName>
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
                    <DetailName variant="button">Address</DetailName>
                  </Grid>
                  <Grid item xs={7}>
                    <DetailName variant="body2">
                      {this.props.interview.address}
                    </DetailName>
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
                    <DetailName variant="button">Room</DetailName>
                  </Grid>
                  <Grid item xs={7}>
                    <DetailName variant="body2">
                      {this.props.interview.room}
                    </DetailName>
                  </Grid>
                </Grid>
                <br />
                <br />
                <DetailText variant="h6" fontWeight="700">
                  Personal Information
                </DetailText>
                <hr />
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={1} />
                  <Grid item xs={3}>
                    <DetailName variant="button">Name</DetailName>
                  </Grid>
                  <Grid item xs={7}>
                    <DetailName variant="body2">
                      {this.props.interviewee.name}
                    </DetailName>
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
                    <DetailName variant="button">Phone</DetailName>
                  </Grid>
                  <Grid item xs={7}>
                    <DetailName variant="body2">
                      {this.props.interviewee.phone_number}
                    </DetailName>
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
                    <DetailName variant="button">Age</DetailName>
                  </Grid>
                  <Grid item xs={7}>
                    <DetailName variant="body2">
                      {this.props.interviewee.age}
                    </DetailName>
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
                    <DetailName variant="button">Email</DetailName>
                  </Grid>
                  <Grid item xs={7}>
                    <DetailName variant="body2">
                      {this.props.interviewee.email}
                    </DetailName>
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
                    <DetailName variant="button">Address</DetailName>
                  </Grid>
                  <Grid item xs={7}>
                    <DetailName variant="body2">
                      {this.props.interviewee.address}
                    </DetailName>
                  </Grid>
                </Grid>
              </CardContent>
            </NiceCard>
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
