import React from "react";
import { withSnackbar } from "notistack";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

class FilterDialog extends React.Component {
  state = { shift: "all", onlyFreeSeats: false };
  handleSubmit = () => {
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
        maxWidth="xs"
        fullWidth
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>Filter lectures.</DialogContentText>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="shift">Shift</InputLabel>
              <Select
                value={this.props.filters.shift}
                onChange={this.props.handleChange("shift")}
                inputProps={{
                  name: "shift",
                  id: "shift"
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="morning">Morning</MenuItem>
                <MenuItem value="noon">Noon</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.props.filters.onlyFreeSeats}
                    onChange={this.props.handleChange("onlyFreeSeats")}
                  />
                }
                label="Has Free Seats"
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default withSnackbar(FilterDialog);
