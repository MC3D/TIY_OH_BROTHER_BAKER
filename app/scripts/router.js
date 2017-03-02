var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('./components/login.jsx').Container;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function(){
    ReactDOM.render(
      React.createElement(Container),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
