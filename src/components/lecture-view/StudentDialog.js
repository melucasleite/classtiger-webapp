import React from "react";
import { withSnackbar } from "notistack";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

class StudentDialog extends React.Component {
  state = {
    students: [{ id: 1, name: "Lucas Leite" }],
    student_id: 5
  };
  handleSubmit = () => {
    console.log(this.state);
    this.props.handleClose();
    this.props.enqueueSnackbar("This is a warning message!", {
      variant: "info",
      action: this.dismissAction
    });
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
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Assign or remove students from lectures.
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel htmlFor="day-of-week">Student</InputLabel>
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
              {this.state.students.map(student => (
                <MenuItem value={student.id}>{student.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Select
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default withSnackbar(StudentDialog);
