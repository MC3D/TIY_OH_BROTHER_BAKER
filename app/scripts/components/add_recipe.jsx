var _ = require('underscore');
var React = require('react');

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
    this.state = {
      steps: 1
    }
  }

  render() {
    let steps = _(this.state.steps).times(function(n){
      return (
        <Step key={ n } index={ n }/>
      )
    });
    return (
      <form className="form">
        <div className="form-group">
          <h3>Basic Info</h3>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Recipe Name" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="By" />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" /> Make it Public
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" /> Keep it Private
          </label>
        </div>
        <div className="form-group">
          <select className="form-control">
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
          <input type="text" className="form-control" placeholder="Prep Time" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Cook Time" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Recipe Name" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Cook Temp" />
        </div>
        <div className="form-group">
          <select className="form-control">
            <option>F</option>
            <option>C</option>
          </select>
        </div>
        <div className="form-group">
          <span>This recipe will make</span>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Amount" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="cookies, loaves, etc" />
        </div>
        {steps}
        <div className="form-group">
          <h3>Personal Notes</h3>
        </div>
        <div className="form-group">
          <textarea className="form-control" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-default">Save this Recipe!</button>
      </form>
    )
  }
}

module.exports = AddRecipe;
