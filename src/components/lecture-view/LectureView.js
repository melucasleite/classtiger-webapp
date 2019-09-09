import React from "react";
import { Container } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { Box } from "@material-ui/core";
import LectureCalendar from "./LectureCalendar";
import LectureActions from "./LectureActions";
import LectureDialog from "./LectureDialog";
import FilterDialog from "./FilterDialog";
import sampleLectures from "./sampleLectures";
import AppBar from "@material-ui/core/AppBar";
import classtigerAPI from "../../services/api";
import moment from "moment";
import Dashboard from "../dashboard/Dashboard";

class LectureView extends React.Component {
  state = {
    lectures: [],
    openDialog: "",
    filters: []
  };

  async componentDidMount() {
    var lectures = await this.loadLectures();
    lectures = this.parseLectures(lectures);
    this.setState({ lectures });
  }

  loadLectures = async () => {
    const res = await classtigerAPI.get("/lectures");
    const lectures = res.data.lectures;
    return lectures;
  };

  parseLectures = lectures => {
    lectures.map(lecture => {
      lecture.start = moment(lecture.start);
      lecture.end = moment(lecture.end);
    });
    return lectures;
  };

  handleAddLecture = lecture => {
    var lectures = this.state.lectures;
    lectures.push(lecture);
    lectures = this.parseLectures(lectures);
    this.setState({ lectures });
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
      <Dashboard>
        <LectureCalendar lectures={this.state.lectures} />
        <LectureActions handleOpenDialog={this.openDialog} />
        <LectureDialog
          open={this.state.openDialog === "lecture"}
          handleClose={this.closeDialog}
          handleAddLecture={this.handleAddLecture}
        />
        <FilterDialog
          open={this.state.openDialog === "filter"}
          handleClose={this.closeDialog}
          filters={this.state.filters}
          handleChange={this.handleChange}
        />
      </Dashboard>
    );
  }
}

export default withSnackbar(LectureView);
