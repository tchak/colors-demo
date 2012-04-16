# Colors Demo

## Attampte to replicate meteor experience with ember-data

This is juste a demo. Esetialy the query stuff is juste a prouf of concept.
Lots of performance/sequrety concerns to be addressed.

The demo make use of Slanger for websocket notificatons

You have to run redis and slanger alongside the demo rails app

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

Try it simultanaously in two browsers.
You can try some query in your webinspector console. Look at the end of query.js file for the supported syntax.

````
App.colorsController.all({likes: {$gt: 10}});
App.colorsController.all({likes: {$gt: 15, $lte: 20}});
````
