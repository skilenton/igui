import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from 'aws-amplify';
import './index.css';
import config from './aws-exports';

Amplify.configure(config);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
