var $ = require('jquery');
var Backbone = require('Backbone');

var parse = {
  BASE_API_URL: 'https://tiny-lasagna-server-new.herokuapp.com',
  initialize: function(config) {
    var config = config || {};
    $.ajaxSetup({
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");

        if (config.sessionId) {
          xhr.setRequestHeader("X-Parse-Session-Token", sessionId);
        }
      }
    });
  },
  deinitialize: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", null);
        xhr.setRequestHeader("X-Parse-REST-API-Key", null);
        xhr.setRequestHeader("X-Parse-Session-Token", null);
      }
    });
  }
};

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  sync: function(){
    var User = require('./models/user.js');
    var user = User.current();
    if(user){
      parse.initialize({ sessionId: user.get('sessionToken') });
    }else{
      parse.initialize();
    }

    var xhr = Backbone.Model.prototype.sync.apply(this, arguments);

    parse.deinitialize();

    return xhr;
  },
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;
    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  setPointer: function(field, parseClass, objectId){
    var pointerObject = {
      "__type": "Pointer",
      "className": parseClass,
      "objectId": objectId
    };
    this.set(field, pointerObject);
    return this;
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {},
  parseWhere: function(field, value, objectId){
    // If an objectId is passed in then we are building a pointer where
    if(objectId){
      value = {
        className: value,
        objectId: objectId,
        '__type': 'Pointer'
      };
    }
    this.whereClause[field] = value;
    return this;
  },
  url: function(){
    var url = this.baseUrl;
    if(Object.keys(this.whereClause).length > 0){
      url += '?where=' + JSON.stringify(this.whereClause);
      this.whereClause = {};
    }
    return url;
  },
  parse: function(data){
    return data.results;
  },
  sync: function(){
    var User = require('./models/user.js');
    var user = User.current();
    if(user){
      parse.initialize({sessionId: user.get('sessionToken')});
    }else{
      parse.initialize();
    }
    var xhr = Backbone.Collection.prototype.sync.apply(this, arguments);
    parse.deinitialize();
    return xhr;
  },
});

module.exports = {
  parse,
  ParseModel,
  ParseCollection
};
