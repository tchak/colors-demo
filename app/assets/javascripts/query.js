DS.Query = Ember.ArrayProxy.extend({

  query: null,

  type: null,

  content: null,

  where: function(query) {
    query = $.extend({}, this.get('query'), query);
    this.set('query', query);

    return this;
  },

  all: function(query) {
    if (this.get('isLoading')) { return this; }

    this.set('isLoaded', false);
    this.set('isLoading', true);

    query = $.extend({}, this.get('query'), query);

    this.set('currentQuery', query);

    query = this.get('type').find(query);

    query.addObserver('isLoaded', this, 'didLoadQuery');

    return this;
  },

  first: function(query, key, length) {
    if (!this.get('isLoaded') && !this.get('isLoading')) { Ember.run.once(this, 'all'); }

    if (length > 0) {
      return this.get('firstObject');
    }
  }.property('content.length'),

  reset: function() {
    this.set('query', null);
  },

  isLoaded: false,
  isLoading: false,
  autoRefresh: false,

  didChangeOption: function() {
    if (this.get('autoRefresh') && this.get('isLoaded')) { Ember.run.once(this, 'all'); }
  }.observes('query'),

  didLoadQuery: function(query, key, isLoaded) {
    if (isLoaded) {
      query.removeObserver('isLoaded', this, 'didLoadQuery');

      var content = this.get('content'),
          store = query.get('store');

      this.set('isLoaded', true);
      this.set('isLoading', false);

      if (!content) {
        query = store.filter(this.get('type'), $.proxy(this, 'filterQuery'));
        this.set('content', query);
      } else {
        store.updateModelArrayFilter(content, content.get('type'), content.get('filterFunction'));
      }
    }
  },

  filterQuery: function(data) {
    var key, query = this.get('currentQuery');

    if ($.isEmptyObject(query)) { return true; }

    for (key in query) {
      if (query.hasOwnProperty(key) && !this.criteria(data.get(key), query[key])) {
        return false;
      }
    }

    return true;
  },

  criteria: function(value, criteria) {
    var type = Ember.typeOf(criteria);
    switch (type) {
    case 'string':
    case 'number':
      return value === criteria;
    case 'regexp':
      return String(value).match(criteria);
    case 'array':
      return criteria.contains(value);
    case 'object':
      return this.eachOperator(value, criteria);
    }
  },

  eachOperator: function(value, criteria) {
    var key;

    for (key in criteria) {
      if (!criteria.hasOwnProperty(key) || !key.match(/^\$/)) { continue; }

      if (!DS.Query.OPERATORS[key](value, criteria[key])){
        return false;
      }
    }

    return true;
  }
});

DS.Query.OPERATORS = {
  $gt: function(a, b) {
    return a > b;
  },
  $lt: function(a, b) {
    return a < b;
  },
  $gte: function(a, b) {
    return a >= b;
  },
  $lte: function(a, b) {
    return a <= b;
  },
  $eq: function(a, b) {
    return a === b;
  }
  // $ne: function(a, b) {
  //   return a !== b;
  // },
  // $in: function(a, b) {
  //   return b.contains(a);
  // },
  // $regex: function(a, b) {
  //   return String(a).match(b);
  // }
};
