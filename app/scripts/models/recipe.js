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
  defaults: function() {
    return {
      ingredients: new IngredientCollection(),
      directions: ''
    }
  }
});

var StepCollection = ParseCollection.extend({

});

var Recipe = ParseModel.extend({
  idAttribute: 'objectId',
  defaults: function(){
    return {
      recipeName: '',
      recipeBy: '',
      recipeType: '',
      prepTime: '',
      cookTime: '',
      cookTemp: '',
      cookDeg: '',
      amount: '',
      amountDesc: '',
      steps: new StepCollection(),
      personalNotes: ''
    }
  }
});

var RecipeCollection = ParseCollection.extend({
  model: Recipe,
  url: function() {
    return parse.BASE_API_URL + '/classes/Recipes';
  },
  parse: function(data){
    return data.results;
  }
});

module.exports = {
  RecipeCollection
}
