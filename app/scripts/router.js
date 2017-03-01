var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var Login = require('./components/login.jsx').Login;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function(){
    ReactDOM.render(
      React.createElement(Login),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
