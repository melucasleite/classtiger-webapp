import React from "react";
import { Grid } from "@material-ui/core";
import LectureDay from "./LectureDay";

const days = [0, 1, 2, 3, 4, 5, 6];

class LectureCalendar extends React.Component {
  dayOfWeekLectures = day => {
    return this.props.lectures.filter(lecture => lecture.dayOfWeek === day);
  };

  render() {
    return (
      <Grid container spacing={1}>
        {days.map(day => {
          return (
            <LectureDay
              key={day}
              day={day}
              lectures={this.dayOfWeekLectures(day)}
            />
          );
        })}
      </Grid>
    );
  }
}

export default LectureCalendar;
