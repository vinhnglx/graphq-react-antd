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
