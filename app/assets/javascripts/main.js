var App = Ember.Application.create({
  ready: function() {
    var appKey = $('meta[name=pusher-app-key]').attr('content');

    DS.Pusher.create({
      appKey: appKey
    });

    App.Color.subscribe();

    App.initialize();

    App.MainView.create().appendTo('body > .container');
  }
});

App.Store = DS.Store.extend({
  revision: 4,
  adapter: DS.RESTAdapter.create({
    namespace: 'api/v1'
  })
});
