import React from "react";
import LectureView from "./components/lecture-view/LectureView";
import Signin from "./components/signin";
import Signup from "./components/signup";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/" component={LectureView} />
    </BrowserRouter>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default App;
