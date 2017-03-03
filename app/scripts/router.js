var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./parse');

var Authentication = require('./components/authentication.jsx').Authentication;
var Recipes = require('./components/recipes.jsx').Recipes;

var User = require('./models/user').User;

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'recipes/': 'recipes'
  },

  initialize: function() {
    // set parse headers and configure BASE_API_URL
    parse.setup({
      BASE_API_URL: 'https://tiny-lasagna-server-new.herokuapp.com'
    });
  },

  execute: function(callback, args, name) {
    var user = User.current();

    if(!user && name != 'index') {
      this.navigate('', { trigger: true });
      return false;
    }

    if(user && name == 'index') {
      this.navigate('recipes/', { trigger: true });
      return false;
    }

    return Backbone.Router.prototype.execute.apply(this, arguments);
  },

  index: function(){
    ReactDOM.render(
      React.createElement(Authentication, { router: this }),
      document.getElementById('app')
    );
  },

  recipes: function(){
    ReactDOM.render(
      React.createElement(Recipes),
      document.getElementById('app')
    );
  }

});

var router = new Router();

module.exports = router;
