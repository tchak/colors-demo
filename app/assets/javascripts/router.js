App.Router = Ember.Router.extend({

  enableLogging: true,

  location: 'hash',

  root: Ember.State.extend({

    index: Ember.State.extend({
      route: '/',

      redirectsTo: 'colors.index'
    }),

    colors: Ember.State.extend({
      route: '/colors',

      enter: function(router) {
        router.get('applicationController').connectOutlet('list', App.ColorsView, App.Color.all());
      },

      editColor: function(router, event) {
        router.getPath('store.defaultTransaction').rollback();
        router.transitionTo('edit', event.context);
        Ember.defaultSession.set('selectedColorId', event.context.get('id'));
      },

      saveColor: function(router, event) {
        event.preventDefault();

        router.get('store').commit();
      },

      likeColor: function(router, event) {
        event.context.incrementProperty('likes');
        router.get('store').commit();
      },

      deleteColor: function(router, event) {
        event.preventDefault();

        var color = event.context;
        color.deleteRecord();
        router.get('store').commit();
      },

      index: Ember.State.extend({
        route: '/',

        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('edit', App.ColorView, App.Color.createRecord());
        }
      }),

      edit: Ember.State.extend({
        route: '/:color_id',
        modelType: 'App.Color',

        connectOutlets: function(router, color) {
          router.get('applicationController').connectOutlet('edit', App.ColorView, color);
        },

        cancel: function(router) {
          router.getPath('store.defaultTransaction').rollback();
          router.transitionTo('colors.index');
        }
      })
    })
  })
});
