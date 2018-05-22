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
