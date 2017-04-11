var _ = require('underscore');
var React = require('react');

var RecipeModel = require('../models/recipe').Recipe;
var StepModel = require('../models/recipe').Step;

class Ingredient extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Amount" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Unit" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Ingredient" />
        </div>
      </div>
    )
  }
}

class Step extends React.Component {
  constructor(props) {
    super(props);
    this._handleInput = this._handleInput.bind(this);
    this._deleteStep = this._deleteStep.bind(this);
  }

  _deleteStep(e) {
    e.preventDefault();
    this.props.deleteStep(this.props.step);
  }

  _handleInput(e) {
    var step = this.props.step;
    step.set({ [e.target.name] : e.target.value });
    this.props.updateStep(step);
  }

  render() {
    return(
      <div>
        <h3>{ `${ 'STEP' + ' ' + this.props.step.get('step')}` }</h3>
        <input type='button' className='btn btn-danger' value="delete" onClick={ this._deleteStep } />
        <Ingredient />
        <div className="form-group">
          <textarea className="form-control" rows="3" placeholder='What directions go with this step?' name='directions' onChange={ this._handleInput }></textarea>
        </div>
      </div>
    )
  }
}

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    var recipe = new RecipeModel();

    this.state = {
      recipe
    };

    this._togglePermissions = this._togglePermissions.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._saveRecipe = this._saveRecipe.bind(this);
    this._addStep = this._addStep.bind(this);
    this._updateStep = this._updateStep.bind(this);
    this._deleteStep = this._deleteStep.bind(this);
  }

  componentDidMount() {
    this._addStep();
  }

  _deleteStep(step) {
    var recipe = this.state.recipe;
    var steps = recipe.get('steps');
    steps.remove(step);
    recipe.set({ steps });
    this.setState({ recipe });
  }

  _handleInput(e) {
    var recipe = this.state.recipe;
    recipe.set({ [e.target.name] : e.target.value });
    this.setState({ recipe });
  }

  _togglePermissions(e) {
    var recipe = this.state.recipe;

    recipe.set({ private: !recipe.get('private') });
    this.setState({ recipe });
  }

  _saveRecipe(e) {
    e.preventDefault();
    console.log('recipe', this.state.recipe);
  }

  _addStep(e) {
    var steps = this.state.recipe.get('steps');
    var step = new StepModel();
    step.set({ step: steps.length + 1 })
    this.setState({ steps: steps.add(step) });
  }

  _updateStep(step) {
    var steps = this.state.recipe.get('steps');
    steps.add(step);
  }

  render() {
    let recipe = this.state.recipe;
    let steps = recipe.get('steps').map((step)=>{
      return (
        <Step key={ step.cid } step={ step } updateStep={ this._updateStep } deleteStep={ this._deleteStep }/>
      )
    });

    return (
      <form className="form" onSubmit={ this._saveRecipe }>
        <div className="form-group">
          <h3>Basic Info</h3>
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
          <select className="form-control" onChange={ this._handleInput } name='type' >
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
          <input type="text" className="form-control" placeholder="Prep Time" onChange={ this._handleInput } value={ recipe.get('prep') } name='prep' />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Cook Time" onChange={ this._handleInput } value={ recipe.get('cook') } name='cook '/>
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
        <button type="button" onClick={ this._addStep } className="btn btn-default">add another step</button>
        <div className="form-group">
          <h3>Personal Notes</h3>
        </div>
        <div className="form-group">
          <textarea className="form-control" rows="3" onChange={ this._handleInput }value={ recipe.get('notes') } name='notes'></textarea>
        </div>
        <button type="submit" className="btn btn-default">Save this Recipe!</button>
      </form>
    )
  }
}

module.exports = Recipe;
