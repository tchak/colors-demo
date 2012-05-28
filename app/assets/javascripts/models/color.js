App.Color = DS.Model.extend({
  name: DS.attr('string'),
  value: DS.attr('string'),
  likes: DS.attr('number', {defaultValue: 0}),

  backgroundStyle: function() {
    return 'background-color: %@;'.fmt(this.get('value'));
  }.property('value'),

  isSelected: function() {
    return Ember.defaultSession.get('selectedColorId') == this.get('id');
  }.property('id', 'Ember.defaultSession.selectedColorId').cacheable()
});

App.Color.registerWithPusher = true;
