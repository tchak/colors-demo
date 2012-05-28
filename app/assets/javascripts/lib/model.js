DS.Model.reopenClass({
  where: function(query) {
    return this.createQuery().where(query);
  },

  all: function(query) {
    return this.createQuery().all(query);
  },

  createQuery: function() {
    return DS.Query.create({type: this});
  }
});

Ember.$.ajaxPrefilter(function(options, originalOptions, xhr) {
  if (!options.crossDomain) {
    var token = $('meta[name="csrf-token"]').attr('content');
    if (token) {
      xhr.setRequestHeader('X-CSRF-Token', token);
    }
  }
});
