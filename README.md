# Demo of SproutCore and bulk_api for Rails

[bulk_api](https://github.com/drogus/bulk_api/) is a Rails engine to bulk access a user's resources via an API. 

It provides SproutCore integration via a custom DataSource. As a result, a [SproutCore](http://sproutcore.com/) application can quickly get all the relevant backend data into the client-side SproutCore front end.

This is a demo application (the todo example from the [SproutCore Guides](guides.sproutcore.com/getting_started.html)) integrated with a Rails app. The Rails app has a single `Todo` model. The integration between SproutCore and Rails is via the `/api/bulk` route used by bulk_api.

There is a [guide to building this application](http://sproutguides-drogus.strobeapp.com/rails.html "SproutCore Guides: Connect SproutCore with Ruby on Rails applications").

## Usage

    git clone git@github.com:drnic/todos-bulk-api-demo.git
    cd todos-bulk-api-demo
    git submodule update --init
    bundle
    rake db:migrate
    rails s

Open [http://localhost:3000/_sproutcore/todos](http://localhost:3000/_sproutcore/todos "Todos") in a browser. Add todo items, finish them, close the browser and revisit it. 

SHAZAM! The data is still there.

## What's missing?

There is no User model and no authentication. bulk_api supports this, but the current example does not.

## Behind the scenes

Want to see the example data in your database from SproutCore's perspective?

    curl http://localhost:3000/api/bulk?todos=all

## License

Seriously? It's example code. 

Seriously. Ok, MIT license. 