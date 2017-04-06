var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var User = require('./models/user');
var RecipeCollection = require('./models/recipe').RecipeCollection;

var Auth = require('./components/auth.jsx');
var Recipes = require('./components/recipes.jsx');
var AddRecipe = require('./components/add_recipe.jsx');

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'recipes/': 'showRecipes',
    'recipes/new/': 'addRecipe'
  },

  execute: function(callback, args, name) {
    var user = User.current();

      // route user to index route if they are not signed in
    if(!user && name != 'index') {
      this.navigate('', { trigger: true });
      return false;
    }

    // route user to recipes route if they are signed in
    if(user && name == 'index') {
      this.navigate('recipes/', { trigger: true });
      return false;
    }

    return Backbone.Router.prototype.execute.apply(this, arguments);
  },

  index: function(){
    ReactDOM.render(
      React.createElement(Auth, { router: this }),
      document.getElementById('app')
    );
  },

  showRecipes: function(){
    ReactDOM.render(
      React.createElement(Recipes),
      document.getElementById('app')
    );
  },

  addRecipe: function() {
    ReactDOM.render(
      React.createElement(AddRecipe),
      document.getElementById('app')
    );
  }

});

var router = new Router();

module.exports = router;
