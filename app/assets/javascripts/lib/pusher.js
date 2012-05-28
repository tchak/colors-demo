DS.Pusher = Ember.Object.extend({
  appKey: null,

  init: function() {
    // TODO: Find a better way to switch betwin pusher and slanger
    if (location.hostname === 'localhost') {
      Pusher.host = 'localhost';
      Pusher.ws_port = 8080;
    }

    this.socket = new Pusher(this.get('appKey'));

    this.socket.connection.bind('connected', $.proxy(function(socket) {
      this.socketId = this.socket.connection.socket_id;
    }, this));

    if (!DS.defaultPusher) {
      DS.set('defaultPusher', this);
    }
  },

  subscribe: function(chanelName) {
    return this.get('socket').subscribe(chanelName);
  }
});

DS.Model.reopenClass({
  rootForType: function(type) {
    if (type.url) { return type.url; }

    // use the last part of the name as the root
    var parts = type.toString().split(".");
    var name = parts[parts.length - 1];
    return name.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
  },

  subscribe: function() {
    var type = this,
        chanel = DS.defaultPusher.subscribe(this.rootForType(type));

    chanel.bind('create', function(data) {
      DS.defaultStore.load(type, data.hash);
    });

    chanel.bind('update', function(data) {
      var record = type.find(data.id);

      if (!record.get('isDirty')) {
        record.get('store').load(type, data.hash);
      }
    });

    chanel.bind('destroy', function(data) {
      var record = type.find(data.id);

      if (!record.get('isDeleted')) {
        record.unloadRecord();
      }
    });
  }
});

Ember.$.ajaxPrefilter(function(options, originalOptions, xhr) {
  if (DS.defaultPusher && DS.defaultPusher.socketId) {
    xhr.setRequestHeader('X-Socket-Id', DS.defaultPusher.socketId);
  }
});
