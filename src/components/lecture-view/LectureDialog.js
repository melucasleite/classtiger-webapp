import React from "react";
import { withSnackbar } from "notistack";
import {
  Button,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import classtigerAPI from "../../services/api";

class CreateLectureDialog extends React.Component {
  state = {
    start: new moment("14:00", "HH:mm").format(),
    end: new moment("16:00", "HH:mm").format(),
    dayOfWeek: 1,
    capacity: 5
  };
  handleSubmit = async () => {
    var { start, end, dayOfWeek, capacity } = this.state;
    try {
      const res = await classtigerAPI.post("lectures", {
        start: start,
        end: end,
        dayOfWeek: dayOfWeek,
        capacity: capacity
      });
      const lecture = res.data.lecture;
      this.props.enqueueSnackbar("Lecture added.", {
        variant: "success",
        action: this.dismissAction
      });
      this.props.handleClose();
      this.props.handleAddLecture(lecture);
    } catch (error) {
      this.props.enqueueSnackbar(error.response.data.message, {
        variant: "error",
        action: this.dismissAction
      });
    }
  };
  dismissAction = key => (
    <Button
      onClick={() => {
        this.props.closeSnackbar(key);
      }}
    >
      {"Dismiss"}
    </Button>
  );
  render = () => {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Lecture</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new lecture for your students.
            </DialogContentText>
            <Box mb={0}>
              <FormControl fullWidth>
                <InputLabel htmlFor="day-of-week">Day of Week</InputLabel>
                <Select
                  value={this.state.dayOfWeek}
                  onChange={e => {
                    this.setState({ dayOfWeek: e.target.value });
                  }}
                  inputProps={{
                    name: "day-of-week",
                    id: "day-of-week"
                  }}
                >
                  <MenuItem value={0}>Sunday</MenuItem>
                  <MenuItem value={1}>Monday</MenuItem>
                  <MenuItem value={2}>Tuesday</MenuItem>
                  <MenuItem value={3}>Wednesday</MenuItem>
                  <MenuItem value={4}>Thursday</MenuItem>
                  <MenuItem value={5}>Friday</MenuItem>
                  <MenuItem value={6}>Saturday</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mb={1}>
              <FormControl fullWidth>
                <TextField
                  id="capacity"
                  type="number"
                  inputProps={{ min: "1", max: "100", step: "1" }}
                  label="Student Capacity"
                  value={this.state.capacity}
                  onChange={e => {
                    var capacity = e.target.value.replace(/[^0-9]/g, "");
                    if (capacity < 1) capacity = 1;
                    if (capacity > 100) capacity = 100;
                    this.setState({
                      capacity: capacity
                    });
                  }}
                  margin="normal"
                />
              </FormControl>
            </Box>
            <Box mb={3}>
              <TimePicker
                label="Lecture Start"
                value={this.state.start}
                onChange={start => this.setState({ start })}
                fullWidth
              />
            </Box>
            <Box mb={3}>
              <TimePicker
                label="Lecture End"
                value={this.state.end}
                onChange={end => this.setState({ end })}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>
    );
  };
}

export default withSnackbar(CreateLectureDialog);
