import React from "react";
import { Container } from "@material-ui/core";
import LectureView from "./components/lecture-view/LectureView";
import Signin from "./components/signin";
import Signup from "./components/signup";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Container>
        <Route exact path="/login" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={LectureView} />
      </Container>
    </Router>
  );
}

export default App;
