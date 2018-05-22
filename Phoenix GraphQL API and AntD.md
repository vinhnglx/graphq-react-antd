# Phoenix GraphQL API and AntD

## Getting Started

#### Step 1

Init project:

```cmd
mix phx.new graphql_example
```

#### Step 2

Add backend dependencies:

- Open your `mix.exs` file

```elixir
defp deps do
  # ...
  {:absinthe_plug, "~> 1.4.0"}, #GraphQL library for Elixir
  {:absinthe_ecto, "~> 0.1.3"},
end
```

Add frontend dependencies

- Init a new `package.json` file from project root folder

```json
{
  "repository": {},
  "license": "MIT",
  "dependencies": {
    "react": "^16.2.0",
    "react-dom": "^16.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.0.0-beta.42",
    "babel-eslint": "^8.2.2",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-plugin-import": "^1.7.0",
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "enzyme-to-json": "^3.3.3",
    "eslint": "^4.5.0",
    "eslint-config-airbnb": "^15.1.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^5.1.1",
    "eslint-plugin-react": "^7.3.0",
    "jest": "^22.4.2",
    "react-test-renderer": "^16.2.0"
  }
}
```

- And `.babelrc` file from project root folder

```json
{
  "presets": [
    "es2015",
    "react"
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd"
      }
    ]
  ]
}
```

- Go to `assets`folder and update `package.json` file

```json
{
  "repository": {},
  "license": "MIT",
  "scripts": {
    "deploy": "brunch build --production",
    "watch": "brunch watch --stdin"
  },
  "dependencies": {
    "antd": "^3.4.3",
    "apollo-boost": "^0.1.4",
    "babel-polyfill": "^6.26.0",
    "graphql": "^0.13.2",
    "graphql-tag": "^2.9.1",
    "lodash": "^4.17.10",
    "moment": "^2.22.1",
    "phoenix": "file:../deps/phoenix",
    "phoenix_html": "file:../deps/phoenix_html",
    "react": "^16.3.2",
    "react-apollo": "^2.1.3",
    "react-dom": "^16.3.2",
    "react-router-dom": "^4.2.2",
    "recompose": "^0.27.0"
  },
  "devDependencies": {
    "babel-brunch": "6.1.1",
    "babel-cli": "^6.26.0",
    "babel-plugin-import": "^1.7.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-1": "^6.24.1",
    "brunch": "2.10.9",
    "clean-css-brunch": "2.10.0",
    "sass-brunch": "^2.10.4",
    "uglify-js-brunch": "2.10.0"
  }
}
```

- Update `assets/brunch-config.js` file

```javascript
exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      // joinTo: 'js/app.js',
      entryPoints: {
        'js/app.js': 'js/app.js',
      },

      // To use a separate vendor.js bundle, specify two files path
      // http://brunch.io/docs/config#-files-
      // joinTo: {
      //   'js/app.js': 'js/app.js',
      //   'js/admin.js': 'js/admin.js',
      // },
      //
      // To change the order of concatenation of files, explicitly mention here
      // order: {
      //   before: [
      //     "vendor/js/jquery-2.1.1.js",
      //     "vendor/js/bootstrap.min.js"
      //   ]
      // }
    },
    stylesheets: {
      joinTo: 'css/app.css',
    },
    // templates: {
    //   joinTo: 'js/app.js'
    // }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/assets/static". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(static)/,
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: ['static', 'css', 'js', 'vendor'],
    // Where to compile files to
    public: '../priv/static',
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      presets: ['es2015', 'react', 'stage-1'],
      ignore: [/vendor/],
    },
    sass: {
      options: {
        includePaths: ['node_modules/antd/dist'], // tell sass-brunch where to look for files to @import
        precision: 8, // minimum precision required by bootstrap
      },
    },
  },

  modules: {
    autoRequire: {
      'js/app.js': ['js/app'],
    },
  },

  npm: {
    enabled: true,
  },
};
```

## Setting up the backend and front-end

#### Backend

- Init a new context (model + functions relate to model).

*NOTE*: Maybe need to comment out `username` and `password` from the `config/dev.exs` file

```
mix phx.gen.context Manage Post posts title:string content:text

mix ecto.create && mix ecto.migrate
```

- Open `lib/graphql_example_web/router.ex`  file and add `get("/*path", PageController, :index)` to handle all urls will be rendered on PageController#index

```elixir
  scope "/", GraphqlExampleWeb do
    # Use the default browser stack
	pipe_through(:browser)

    get("/", PageController, :index)
    get("/*path", PageController, :index)
  end

```

- Delete `rm -rf lib/graphql_example_web/templates/page` folder and edit `lib/graphql_example_web/templates/app.html.eex` file

```
rm -rf lib/graphql_example_web/templates/page
```

```html
# app.html.eex

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>GraphQL Example!</title>
    <link rel="stylesheet" href="<%= static_path(@conn, "/css/app.css") %>">
  </head>

  <body>
    <div id="root"></div>
    <script src="<%= static_path(@conn, "/js/app.js") %>"></script>
  </body>
</html>

```

- Init graphql folder and files by commands

```
cd lib/graphql_example
mkdir graphql
touch graphql/schema.ex
mkdir -p graphql/schema
mkdir -p graphql/schema/types
mkdir -p graphql/schema/resolvers
touch graphql/schema/types.ex
```

- Define GraphQL.Schema with a simple Query from `lib/graphql_example/graphql/schema.ex` file

```
defmodule GraphQL.Schema do
  use Absinthe.Schema
  alias GraphQL.Resolvers

  query do
    field(:health, :string, resolve: fn _, _ -> {:ok, "up"} end)
  end
end
```

- Edit `lib/graphql_example_web/router.ex` file and and GraphQL Endpoint

```elixir
scope "/" do
    pipe_through(:api)
    forward("/api", Absinthe.Plug, schema: GraphQL.Schema)
    forward("/graphiql", Absinthe.Plug.GraphiQL, schema: GraphQL.Schema)
end
```

- Then you can go to define Graphql API in `schema.ex` and define corresponding types in `types` folder and then define the resolver in `resolvers` folder.
- **Note**: After you define a new type you need to `use` (aka call) in `types.ex` file.

#### FrontEnd

- Open `assets/js/app.js` file and import React libs

```javascript
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const App = () => (
  <Switch>
    <Route path="/" component={() => (<h2>Hail Hydra!</h2>)} />
  </Switch>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <App />

    </BrowserRouter>,
    document.getElementById('root'),
  )
})

```

- Init Apollo Client to run graphQL API

```javascript
// assets/js/client.js

import ApolloClient from 'apollo-boost'

const errorLink = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      // window.location.href = "/500"
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    // window.location.href = "/"
  }
}

const httpLink = '/api'

//  Use after login
const client = new ApolloClient({
  uri: httpLink,
  onError: errorLink,
})

export default client

```

- Update `assets/js/app.js` file

```javascript
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import client from './client'

const App = () => (
  <Switch>
    <Route path="/" component={() => (<h2>Hail Hydra!</h2>)} />
  </Switch>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>

    </BrowserRouter>,
    document.getElementById('root'),
  )
})
```



## Conclusion



Now the app can run on React and Apollo as GraphQL client and Absinthe as GraphQL for backend.



