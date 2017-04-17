var _ = require('underscore');
var React = require('react');
var Backbone = require('backbone');
var octicons = require('react-octicons');

var Recipe = require('../models/recipe').Recipe;
var Step = require('../models/recipe').Step;
var StepCollection = require('../models/recipe').StepCollection;
var Ingredient = require('../models/recipe').Ingredient;
var IngredientCollection = require('../models/recipe').IngredientCollection;

class IngredientListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="flex-row-center">
        <div className="form-group inline">
          <input type="text" className="form-control" placeholder="Amount" value={this.props.ingredient.get('amount')} />
        </div>
        <div className="form-group inline">
          <input type="text" className="form-control" placeholder="Unit" value={this.props.ingredient.get('unit')} />
        </div>
        <div className="form-group inline">
          <input type="text" className="form-control" placeholder="Ingredient" value={this.props.ingredient.get('ingredient')} />
        </div>
        <div className="form-group inline">
          <input type="button" className="btn btn-danger" value="-" onClick={ this.props.deleteIngredient } />
        </div>
      </div>
    )
  }
}

class StepListItem extends React.Component {
  constructor(props) {
    super(props);
    this._handleInput = this._handleInput.bind(this);
  }

  _handleInput(e) {
    if(e.target.name == 'directions'){
      var step = this.props.step;
      step.set({ [e.target.name] : e.target.value });
      this.props.updateStep(step);
    } else {
      var ingredient = this.props.ingredient;
      ingredient.set({ [e.target.name] : e.target.value });
    }
  }

  render() {
    let step = this.props.step;
    let ingredients = step.get('ingredients').map((ingredient)=>{
      return (
        <IngredientListItem key={ ingredient.cid } ingredient={ ingredient } deleteIngredient={ () => this.props.deleteIngredient(this.props.step, ingredient) } />
      )
    });

    return(
      <div className='well'>
        <h3><span>STEP</span><octicons.TrashcanIcon className='pull-right cursor-pointer' onClick={ () => this.props.deleteStep(this.props.step) } /></h3>
        { ingredients }
        <div className="flex-row-center">
          <div className="form-group inline">
            <input type="text" className="form-control" placeholder="Amount" ref="amount" name="amount" onChange={ this._handleInput } value={this.props.ingredient.get('amount')} />
          </div>
          <div className="form-group inline">
            <input type="text" className="form-control" placeholder="Unit" ref="unit" name="unit" onChange={ this._handleInput } value={this.props.ingredient.get('unit')} />
          </div>
          <div className="form-group inline">
            <input type="text" className="form-control" placeholder="Ingredient" ref="ingredient" name="ingredient" onChange={ this._handleInput } value={this.props.ingredient.get('ingredient')}/>
          </div>
          <div className="form-group inline">
            <input type="button" className="btn btn-primary" value="+" onClick={ () => this.props.addIngredient(this.props.step, this.props.ingredient, this) } />
          </div>
        </div>
        <div className="form-group">
          <textarea className="form-control" rows="3" placeholder='What directions go with this step?' name='directions' onChange={ this._handleInput } value={this.props.step.get('directions')}></textarea>
        </div>
      </div>
    )
  }
}

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);

    var recipe = new Recipe();
    var ingredient = new Ingredient();

    if(this.props.id) {
      recipe.set({ objectId: this.props.id });
      recipe.fetch().then(()=>{
        this.setState({ recipe });
      });
    }

    this.state = {
      recipe
    };

    this._togglePermissions = this._togglePermissions.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._saveRecipe = this._saveRecipe.bind(this);
    this._deleteRecipe = this._deleteRecipe.bind(this);
    this._addStep = this._addStep.bind(this);
    this._updateStep = this._updateStep.bind(this);
    this._deleteStep = this._deleteStep.bind(this);
    this._addIngredient = this._addIngredient.bind(this);
    this._deleteIngredient = this._deleteIngredient.bind(this);
  }

  componentDidMount() {
    this._addStep();
  }

  _handleInput(e) {
    var recipe = this.state.recipe;
    recipe.set({ [e.target.name] : e.target.value });
    this.setState({ recipe });
  }

  _togglePermissions() {
    var recipe = this.state.recipe;
    recipe.set({ private: !recipe.get('private') });
    this.setState({ recipe });
  }

  _addStep() {
    var steps = this.state.recipe.get('steps');
    steps.add(new Step());
    this.setState({ [this.state.recipe.get('steps')]: steps });
  }

  _deleteStep(step) {
    var steps = this.state.recipe.get('steps');
    steps.remove(step);
    this.setState({ [this.state.recipe.get('steps')]: steps });
  }

  _updateStep(step) {
    var steps = this.state.recipe.get('steps');
    steps.add(step);
    this.setState({ [this.state.recipe.get('steps')]: steps });
  }

  _addIngredient(step, ingredient, component) {
    var steps = this.state.recipe.get('steps');
    step.get('ingredients').add(ingredient);
    steps.add(step);
    this.setState({ [this.state.recipe.get('steps')]: steps });

    component.refs.amount.value = null;
    component.refs.unit.value = null;
    component.refs.ingredient.value = null;
  }

  _deleteIngredient(step, ingredient) {
    var steps = this.state.recipe.get('steps');
    step.get('ingredients').remove(ingredient);
    steps.add(step);
    this.setState({ [this.state.recipe.get('steps')]: steps })
  }

  _saveRecipe(e) {
    e.preventDefault();
    var recipe = this.state.recipe;
    recipe.save().then(() => {
      Backbone.history.navigate('recipes/', {trigger: true});
    });
  }

  _deleteRecipe(e) {
    e.preventDefault();
    var recipe = this.state.recipe;
    recipe.destroy().then(() => {
      Backbone.history.navigate('recipes/', {trigger: true});
    });
  }

  render() {
    let recipe = this.state.recipe;
    let ingredient = new Ingredient();
    let steps = this.state.recipe.get('steps').map((step)=>{
      return (
        <StepListItem key={ step.cid } step={ step } ingredient={ ingredient } updateStep={ this._updateStep } deleteStep={ this._deleteStep } addIngredient={ this._addIngredient } deleteIngredient={ this._deleteIngredient }/>
      )
    });

    return (
      <form className="form well" onSubmit={ this._saveRecipe }>
        <div className="form-group">
          <h3><span>BASIC INFO</span><octicons.TrashcanIcon className='pull-right cursor-pointer' onClick={ this._deleteRecipe } /></h3>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Recipe Name" onChange={ this._handleInput } value={ recipe.get('name') } name='name' />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="By" onChange={ this._handleInput } value={ recipe.get('by') } name='by' />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={ !recipe.get('private') } onChange={ this._togglePermissions } /> Make it Public
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={ recipe.get('private') } onChange={ this._togglePermissions }/> Keep it Private
          </label>
        </div>
        <div className="form-group">
          <select className="form-control" onChange={ this._handleInput } name='category' value={recipe.get('category')} >
            <option>Recipe Category</option>
            <option>Appetizer</option>
            <option>Breakfast</option>
            <option>Dessert</option>
            <option>Dinner</option>
            <option>Lunch</option>
            <option>Snack</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Prep Time" onChange={ this._handleInput } value={ recipe.get('prep') } name='prep' />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Cook Time" onChange={ this._handleInput } value={ recipe.get('cook') } name='cook'/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Cook Temp" onChange={ this._handleInput } value={ recipe.get('temp') } name='temp' />
        </div>
        <div className="form-group">
          <select className="form-control" onChange={ this._handleInput } name='degrees' >
            <option>F</option>
            <option>C</option>
          </select>
        </div>
        <div className="form-group">
          <span>This recipe will make</span>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Amount" onChange={ this._handleInput } value={ recipe.get('amount') } name='amount'/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="cookies, loaves, etc" onChange={ this._handleInput } value={ recipe.get('type') } name='type' />
        </div>
        { steps }
        <div className="form-group">
          <button type="button" onClick={ this._addStep } className="btn btn-default">add another step</button>
        </div>

        <div className="form-group">
          <h3>PERSONAL NOTES</h3>
        </div>
        <div className="form-group">
          <textarea className="form-control" rows="3" onChange={ this._handleInput }value={ recipe.get('notes') } name='notes'></textarea>
        </div>
        <button type="submit" className="btn btn-default">Save this Recipe!</button>
      </form>
    )
  }
}

module.exports = RecipeForm;
