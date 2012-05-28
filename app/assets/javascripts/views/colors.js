App.MainView = Ember.View.extend({
  controllerBinding: 'App.stateManager.applicationController',
  templateName: 'main'
});

App.ColorsView = Ember.View.extend({
  templateName: 'list'
});

App.ColorView = Ember.View.extend({
  templateName: 'edit'
});

App.ColorField = Ember.TextField.extend({
  classNames: ['ember-color-field'],
  didInsertElement: function() {
    colorPicker.allowClose = false;
    //colorPicker.expColor = false;
    colorPickerallowResize = false;
    colorPicker.allowDrag = false;
    size = 1;
    colorPicker.exportColor = $.proxy(function() {
      this.set('value', '#'+colorPicker.CP.hex);
    }, this);
  },
  focusIn: function(evt) {
    colorPicker(evt);
  },
  focusOut: function() {
    this.$().css('backgroundColor', 'none');
  }
});

$(document).click(function(evt) {
  if (!$(evt.target).closest('.cPSkin').length && $(evt.target).is(':not(.ember-color-field)')) {
    if (colorPicker.cP) { colorPicker.cP.cPSkins.display = 'none'; }
  }
});
