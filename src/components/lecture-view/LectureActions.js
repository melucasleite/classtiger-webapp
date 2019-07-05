import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

const styles = theme => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
});

class LectureActions extends React.Component {
  state = {
    open: false,
    hidden: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render = () => {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.speedDial}
          hidden={this.state.hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={this.state.open}
        >
          <SpeedDialAction
            icon={<Icon>filter_list</Icon>}
            onClick={() => this.props.handleOpenDialog("filter")}
            tooltipTitle="Filter"
            tooltipOpen
          />
          <SpeedDialAction
            icon={<Icon>calendar_today</Icon>}
            onClick={() => this.props.handleOpenDialog("lecture")}
            tooltipTitle="Lecture"
            tooltipOpen
          />
        </SpeedDial>
      </div>
    );
  };
}

export default withStyles(styles)(LectureActions);
