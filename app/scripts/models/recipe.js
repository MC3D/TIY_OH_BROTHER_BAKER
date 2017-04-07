var Backbone = require('Backbone');

var parse = require('../parse').parse;
var ParseModel = require('../parse').ParseModel;
var ParseCollection = require('../parse').ParseCollection;

var Ingredient = ParseModel.extend({
  // objectID is the parse id
  idAttribute: 'objectId',
  urlRoot: parse.BASE_API_URL + '/classes/Ingredients'
});

var IngredientCollection = ParseCollection.extend({
  baseUrl: parse.BASE_API_URL + '/classes/Ingredients'
});

var Step = ParseModel.extend({
  idAttribute: 'objectId',
  urlRoot: parse.BASE_API_URL + '/classes/Steps',
  defaults: function() {
    return {
      ingredients: new IngredientCollection()
    }
  }
});

var StepCollection = ParseCollection.extend({
  model: Step,
  baseUrl: parse.BASE_API_URL + '/classes/Steps',
  comparator: function(step) {
    return step.get('count');
  }
});

var Recipe = ParseModel.extend({
  idAttribute: 'objectId',
  urlRoot: parse.BASE_API_URL + '/classes/Recipes',
  defaults: function(){
    return {
      degrees: 'F',
      steps: new StepCollection(),
      private: true
    }
  }
});

var RecipeCollection = ParseCollection.extend({
  model: Recipe,
  baseUrl: parse.BASE_API_URL + '/classes/Recipes'
});

module.exports = {
  RecipeCollection,
  Recipe,
  StepCollection,
  Step
}
