var _ = require('underscore');
var React = require('react');

var Recipe = require('../models/recipe').Recipe;

// var Step = require('../models/recipe').Step;

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <h3>Step {this.props.index + 1}</h3>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Amount" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Unit" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Ingredient" />
        </div>
        <div className="form-group">
          <textarea className="form-control" rows="3" placeholder='What directions go with this step?'></textarea>
        </div>
        <button type="submit" className="btn btn-default">add another step</button>
      </div>
    )
  }
}

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);

    var recipe = new Recipe();

    this.state = {
      steps: 1,
      private: true,
      recipe
    };

    this._togglePrivate = this._togglePrivate.bind(this);
    this._handleBasicInfo = this._handleBasicInfo.bind(this);
    this._saveRecipe = this._saveRecipe.bind(this);
  }

  _handleBasicInfo(e) {
    var recipe = this.state.recipe;
    recipe.set({ [e.target.name] : e.target.value });
    this.setState({ recipe });
  }

  _togglePrivate(e) {
    var recipe = this.state.recipe;
    recipe.set({ private: !recipe.get('private') });
    this.setState({ recipe });
  }

  _saveRecipe(e) {
    e.preventDefault();
    console.log('recipe', this.state.recipe);
  }

  render() {
    let steps = _(this.state.steps).times(function(n){
      return (
        <Step key={ n } index={ n }/>
      )
    });

    let recipe = this.state.recipe;

    return (
      <form className="form" onSubmit={ this._saveRecipe }>
        <div className="form-group">
          <h3>Basic Info</h3>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Recipe Name" onChange={ this._handleBasicInfo } value={ recipe.get('name') } name='name' />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="By" onChange={ this._handleBasicInfo } value={ recipe.get('by') } name='by' />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={ !recipe.get('private') } onChange={ this._togglePrivate } /> Make it Public
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={ recipe.get('private') } onChange={ this._togglePrivate }/> Keep it Private
          </label>
        </div>
        <div className="form-group">
          <select className="form-control" onChange={ this._handleBasicInfo } name='type' >
            <option>Recipe Type</option>
            <option>Appetizer</option>
            <option>Breakfast</option>
            <option>Dessert</option>
            <option>Dinner</option>
            <option>Lunch</option>
            <option>Snack</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Prep Time" onChange={ this._handleBasicInfo } value={ recipe.get('prep') } name='prep' />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Cook Time" onChange={ this._handleBasicInfo } value={ recipe.get('cook') } name='cook '/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Cook Temp" onChange={ this._handleBasicInfo } value={ recipe.get('temp') } name='temp' />
        </div>
        <div className="form-group">
          <select className="form-control" onChange={ this._handleBasicInfo } name='degrees' >
            <option>F</option>
            <option>C</option>
          </select>
        </div>
        <div className="form-group">
          <span>This recipe will make</span>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Amount" onChange={ this._handleBasicInfo } value={ recipe.get('amount') } name='amount'/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="cookies, loaves, etc" onChange={ this._handleBasicInfo } value={ recipe.get('type') } name='type' />
        </div>
        {steps}
        <div className="form-group">
          <h3>Personal Notes</h3>
        </div>
        <div className="form-group">
          <textarea className="form-control" rows="3" onChange={ this._handleBasicInfo }value={ recipe.get('notes') } name='notes'></textarea>
        </div>
        <button type="submit" className="btn btn-default">Save this Recipe!</button>
      </form>
    )
  }
}

module.exports = AddRecipe;
