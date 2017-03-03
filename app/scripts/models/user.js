var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../parse');

// first object is used to write methods you want instantiated on each instance of the model
// second object is used to write methods that you want on the class itself

var User = Backbone.Model.extend({
  // objectID is the parse id
  idAttribute: 'objectId',
  urlRoot: function() {
    return parse.BASE_API_URL + '/users';
  }
},{
  login: function(credentials, callback){
    // $.param => create a serialized representation of an array, a plain object, or a jQuery object suitable for use in a URL query string or Ajax request.
    var url = parse.BASE_API_URL + '/login?' + $.param(credentials);
    $.get(url).then(data => {
      var user = new User(data);
      User.store(user);
      callback();
    });
  },
  signup: function(credentials){
    var newUser = new User(credentials);
    newUser.save().then(() => {
      User.store(newUser);
    });
    return newUser;
  },
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  current: function(){
    var user = localStorage.getItem('user');

    // if no user in local storage, bail
    if(!user){
      return false;
    }

    user = new User(JSON.parse(user));

    // If we don't have a token, bail
    if(!user.get('sessionToken')){
      return false;
    }

    return user;
  }
});

module.exports = {
  User
};
