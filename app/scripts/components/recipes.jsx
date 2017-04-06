var React = require('react');

class Recipes extends React.Component {
  componentWillMount() {
    // this.props.fetchItems();
  }

  render() {
    let items = [ { title:'new recipe', description: 'd adskjfa dskfjadfkja sdfjadsf', rating: 5 } ];
    if(!items) {
      return <div>Loading ...</div>
    }
    items = items.map(function(item, index){
      return (
        <div className="col-sm-6 col-md-4" key={ index }>
          <div className="thumbnail">
            <label htmlFor="label-test">Click Me</label>
            <input id="label-test" type="text" />
            <div className="caption">
              <h3>{ item.title }</h3>
              <p>{ item.description }</p>
              <span>{ item.rating }</span>
              <p><a href="#" className="btn btn-primary" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
            </div>
          </div>
        </div>
      )
    });
    return (
      <div className="row">
        { items }
      </div>
    )
  }
}

module.exports = Recipes
