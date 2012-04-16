DS.Pusher.create({
  apiKey: 'colors-app'
});

var App = Ember.Application.create({
  ready: function() {
    App.Color.subscribe();
  },

  store: DS.Store.create({
    revision: 5,
    adapter: DS.RESTAdapter.create({
      bulkCommit: false,
      namespace: 'api/v1'
    })
  })
});

App.Color = DS.Model.extend({
  name: DS.attr('string'),
  value: DS.attr('string'),
  likes: DS.attr('number', {defaultValue: 0}),

  like: function() {
    if (!this.get('isDirty')) {
      this.incrementProperty('likes');
    }
  },

  remove: function() {
    this.deleteRecord();
  },

  backgroundStyle: function() {
    return 'background-color: %@;'.fmt(this.get('value'));
  }.property('name').cacheable()
});

App.colorsController = Ember.ArrayProxy.create({
  content: App.Color.all(),

  color: Ember.Object.create(),

  all: function(query) {
    this.get('content').all(query);
  },

  allColors: App.store.findAll(App.Color),
  isEmptyBinding: Ember.Binding.not('allColors.length'),

  createColors: function() {
    if (this.get('isEmpty')) {
      App.COLORS.forEach(function(colorName) {
        var color = {};
        color.name = colorName;
        color.value = colorName;
        App.Color.createRecord(color);
      });
    }
  },

  createColor: function(evt) {
    evt.preventDefault();

    var color = this.get('color');
    App.Color.createRecord(color.getProperties('name', 'value'));
    color.setProperties({
      name: null,
      value: null
    });
  }
});

App.ColorsView = Ember.View.extend({
  controller: App.colorsController,
  templateName: 'templates/main'
});

App.ColorField = Ember.TextField.extend({
  classNames: ['ember-color-field'],
  didInsertElement: function() {
    colorPicker.allowClose = false;
    colorPicker.expColor = false;
    colorPicker.expHEX = false;
    colorPickerallowResize = false;
    colorPicker.allowDrag = false;
    size = 1;
    colorPicker.exportColor = $.proxy(function() {
      this.set('value', '#'+colorPicker.CP.hex);
    }, this);
  },
  focusIn: function(evt) {
    colorPicker(evt);
  }
});

$(document).click(function(evt) {
  if (!$(evt.target).closest('.cPSkin').length && $(evt.target).is(':not(.ember-color-field)')) {
    if (colorPicker.cP) { colorPicker.cP.cPSkins.display = 'none'; }
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
