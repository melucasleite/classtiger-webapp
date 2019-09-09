import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import classtigerAPI from "../services/api";

const AdapterLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignUp extends React.Component {
  state = {
    name: "",
    password: "",
    email: "",
    redirect: "",
    nameError: false,
    passwordError: false,
    emailError: false
  };

  onSubmit = async event => {
    event.preventDefault();
    await this.setState({ name: this.state.name.trim() });
    await this.setState({ email: this.state.email.trim() });
    await this.setState({ password: this.state.password.trim() });
    var { name, email, password } = this.state;
    this.setState({
      nameError: false,
      emailError: false,
      passwordError: false
    });
    if (name.length < 5 || name.length > 180) {
      this.setState({
        nameError: "Name must be between 5 and 180 characters."
      });
    }
    if (email.length < 5 || email.length > 180) {
      this.setState({
        emailError: "Email must be between 5 and 180 characters."
      });
    }
    if (password.length < 8 || password.length > 180) {
      this.setState({
        passwordError: "Password must be between 8 and 180 characters."
      });
    }
    if (
      this.state.nameError ||
      this.state.passwordError ||
      this.state.emailError
    ) {
      return;
    }
    try {
      const res = await classtigerAPI.post("auth", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      });
      this.props.enqueueSnackbar("User created.", {
        variant: "success",
        action: this.dismissAction
      });
    } catch (error) {
      this.props.enqueueSnackbar(error.response.data.message, {
        variant: "error",
        action: this.dismissAction
      });
      console.log(error.response.data);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={this.state.name}
                  onChange={event => {
                    this.setState({ name: event.target.value });
                  }}
                  helperText={this.state.nameError}
                  error={this.state.nameError}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={this.state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value });
                  }}
                  variant="outlined"
                  helperText={this.state.emailError}
                  error={this.state.emailError}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={this.state.password}
                  onChange={event => {
                    this.setState({ password: event.target.value });
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  helperText={this.state.passwordError}
                  error={this.state.passwordError}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={AdapterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withSnackbar(withStyles(styles)(SignUp));
