var React = require('react');
var ReactDOM = require('react-dom');

var Login = require('./components/login.jsx').Login;

ReactDOM.render(
  React.createElement(Login),
  document.getElementById('app')
);
