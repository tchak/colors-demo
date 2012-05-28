(function() {
var get = Ember.get, set = Ember.set;

var dataProperty = Ember.computed(function(key, value) {
  var data = get(this, 'data');

  if (value !== undefined) {
    data[key] = value;
    set(this, 'data', data);
  }

  return data[key];
}).property('data').cacheable();

Ember.Storage = Ember.Object.extend({

  storageKey: null,

  storage: null,

  unknownProperty: function(key) {
    Ember.defineProperty(this, key, dataProperty);

    return get(this, 'data')[key];
  },

  setUnknownProperty: function(key, value) {
    Ember.defineProperty(this, key, dataProperty);

    return set(this, key, value);
  },

  toJSON: function() {
    return get(this, 'data');
  },

  destroy: function() {
    this.removeData();

    this._super();
  },

  serializeData: function(data) {
    return data ? JSON.stringify(data) : '';
  },

  parseData: function(data) {
    try {
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  setData: function(data) {
    var storage = get(this, 'storage'),
        storageKey = get(this, 'storageKey');

    data = this.serializeData(data);
    storage.setItem(storageKey, data);
  },

  getData: function() {
    var storage = get(this, 'storage'),
        storageKey = get(this, 'storageKey'),
        data = storage.getItem(storageKey);

    return this.parseData(data);
  },

  removeData: function() {
    var storage = get(this, 'storage'),
        storageKey = get(this, 'storageKey');

    storage.removeItem(storageKey);
  },

  data: Ember.computed(function(key, value) {
    if (value === undefined) {
      return this.getData();
    } else {
      this.setData(value);

      return value;
    }
  }).cacheable()
});

Ember.LocalStorage = Ember.Storage.extend({
  storage: window.localStorage
});

Ember.SessionStorage = Ember.Storage.extend({
  storage: window.sessionStorage
});

Ember.defaultSession = Ember.SessionStorage.create({
  storageKey: 'ember-default-session'
});

})();
