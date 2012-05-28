App.ColorsController = Ember.ArrayController.extend({
  all: function(query) {
    this.get('content').all(query);
  }
});
