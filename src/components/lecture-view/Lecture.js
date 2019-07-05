import React from "react";
import { Grid, CardContent, Typography, Card } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

class Lecture extends React.Component {
  state = {
    start: this.props.lecture.start,
    end: this.props.lecture.end,
    capacity: this.props.lecture.capacity,
    students: this.props.lecture.students
  };

  onClick = () => {
    alert("wow");
  };

  render() {
    return (
      <Grid item xs={12} onClick={this.onClick}>
        <Card>
          <CardContent>
            <Typography align="center" variant="body2">
              {this.state.start} - {this.state.end}
            </Typography>
            <Typography align="center" variant="body2">
              {this.state.students}/{this.state.capacity} <Icon>person</Icon>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default Lecture;
