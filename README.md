# Colors Demo

## Attempt to replicate Meteor experience with ember-data

This is just a demo. Essentially the query stuff is just a proof of concept.
Lots of performance/security concerns to be addressed.

The demo makes use of Slanger for websocket notificatons

You have to run Redis and Slanger alongside the demo Rails app

````
brew install redis
redis-server
````

````
git clone git://github.com/tchak/colors-demo.git
cd colors-demo

bundle install
bundle exec slanger --app_key colors --secret toto42
````

````
cd colors-demo
bundle exec rake db:migrate
bundle exec rails
````

Try it simultaniously in two browsers.
You can try some query in your webinspector console. Look at the end of query.js file for the supported syntax.

````
App.colorsController.all({likes: {$gt: 10}});
App.colorsController.all({likes: {$gt: 15, $lte: 20}});
````
