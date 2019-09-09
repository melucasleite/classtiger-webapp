import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import Lecture from "./Lecture";

const DayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function LectureDay(props) {
  return (
    <Grid item lg>
      <Box mb={5}>
        <Typography align="center" variant="h6">
          {DayOfWeek[props.day]}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {props.lectures.map(lecture => (
          <Lecture key={lecture._id} lecture={lecture} />
        ))}
      </Grid>
    </Grid>
  );
}

export default LectureDay;
