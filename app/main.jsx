'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'

//outside stuff
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {cyan500, darkBlack, white} from 'material-ui/styles/colors'

//my stuff
import store from './store'
import { receiveRecipes, singleRecipe } from './reducers/recipe'
import Recipes from './components/Recipes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import AppContainer from './containers/AppContainer'
import MakeIt from './containers/MakeIt'
import AddRecipe from './containers/AddRecipe'

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
  }
})

const loadRecipes = (nextState, replace, done) => {
  axios.get(`/api/recipes/`)
  .then(recipes => store.dispatch(receiveRecipes(recipes.data)))
  .then(() => done())
  .catch(console.error)
}

const loadSingleRecipe = (nextState, replace, done) => {
  axios.get(`/api/recipes/${nextState.params.recipeId}`)
  .then(recipe => {
    store.dispatch(singleRecipe(recipe.data))})
  .then(() => done())
  .catch(console.error)
}


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <nav>
          {user ? <div> <WhoAmI/> {children} </div> : <Login/>}
        </nav>
      </div>
    </MuiThemeProvider>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/recipes" />
        <Route path="/recipes" component={AppContainer} onEnter={loadRecipes} />
        <Route path="/makeit/:recipeId"
        component={MakeIt} onEnter={loadSingleRecipe}/>
        <Route path="/add" component={AddRecipe}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
