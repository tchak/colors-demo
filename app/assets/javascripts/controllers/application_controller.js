App.ApplicationController = Ember.Controller.extend({
  hasNoColors: false,

  createColors: function() {
    App.COLORS.forEach(function(colorName) {
      var color = {};
      color.name = colorName;
      color.value = colorName;
      App.Color.createRecord(color);
    });
    this.getPath('target.store').commit();
  }
});

App.COLORS = [
  'blue',
  'red',
  'green',
  'yellow',
  'pink',
  'orange',
  'purple'
];
