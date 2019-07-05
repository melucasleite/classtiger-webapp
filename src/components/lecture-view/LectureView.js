import React from "react";
import { withSnackbar } from "notistack";
import { Box } from "@material-ui/core";
import LectureCalendar from "./LectureCalendar";
import LectureActions from "./LectureActions";
import LectureDialog from "./LectureDialog";
import FilterDialog from "./FilterDialog";
import sampleLectures from "./sampleLectures";

class LectureView extends React.Component {
  state = {
    lectures: sampleLectures,
    openDialog: "filter",
    filters: []
  };

  openDialog = dialog => {
    this.setState({ openDialog: dialog });
  };

  closeDialog = () => {
    this.setState({ openDialog: null });
  };

  handleChange = name => event => {
    console.log(`handleChange
    Name: ${name}
    event.target.value: ${event.target.value}`);
    console.log(this.state);
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <Box mt={15}>
        <LectureCalendar lectures={this.state.lectures} />
        <LectureActions handleOpenDialog={this.openDialog} />
        <LectureDialog
          open={this.state.openDialog === "lecture"}
          handleClose={this.closeDialog}
        />
        <FilterDialog
          open={this.state.openDialog === "filter"}
          handleClose={this.closeDialog}
          filters={this.state.filters}
          handleChange={this.handleChange}
        />
      </Box>
    );
  }
}

export default withSnackbar(LectureView);
