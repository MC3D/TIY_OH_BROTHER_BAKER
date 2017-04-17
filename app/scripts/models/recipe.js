var Backbone = require('Backbone');

var parse = require('../parse').parse;
var ParseModel = require('../parse').ParseModel;
var ParseCollection = require('../parse').ParseCollection;

var Ingredient = ParseModel.extend({
  idAttribute: 'objectId',
  urlRoot: parse.BASE_API_URL + '/classes/Ingredients'
});

var IngredientCollection = ParseCollection.extend({
  model: Ingredient,
  baseUrl: parse.BASE_API_URL + '/classes/Ingredients'
});

var Step = ParseModel.extend({
  idAttribute: 'objectId',
  urlRoot: parse.BASE_API_URL + '/classes/Steps',
  defaults: function() {
    return {
      ingredients: new IngredientCollection()
    }
  },
  parse: function(data) {
    data.ingredients = new IngredientCollection(data.ingredients);
    return data;
  }
});

var StepCollection = ParseCollection.extend({
  model: Step,
  baseUrl: parse.BASE_API_URL + '/classes/Steps'
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
  },
  parse: function(data) {
    data.steps = new StepCollection(data.steps);
    data.steps.forEach(function(step){
      var ingredients = step.get('ingredients');
      ingredients = new IngredientCollection(ingredients);
      step.set({ ingredients });
    });
    return data;
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
  Step,
  IngredientCollection,
  Ingredient
}
