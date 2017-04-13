var React = require('react');

var RecipeCollection = require('../models/recipe').RecipeCollection;

class Recipes extends React.Component {
  constructor(props){
    super(props);

    var collection = new RecipeCollection();

    collection.fetch().then(() => {
      this.setState({ collection });
    });

    this.state = {
      collection
    }
  }

  render() {
    var recipes = this.state.collection.map(function(recipe){
      console.log('recipe', recipe);
      return (
        <div key={recipe.cid} className="col-xs-6 col-md-3">
          <a href={`#recipes/edit/${recipe.id}/`} className="thumbnail">
            <img src='images/img_frog.jpg' alt="..." />
          </a>
        </div>
      )
    });
    return (
      <div className="row">
        { recipes }
      </div>
    )
  }
}

module.exports = Recipes
