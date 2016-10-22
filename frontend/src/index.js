import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { render } from 'react-dom'
import React from 'react'
import starField from './star-field'
import App from './app'
// import starsFixtures from './stars.fixture.json'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

starField(['pirelenito', 'xaviervia']).then((stars) => {
// Promise.resolve(starsFixtures).then((stars) => {
  console.log(JSON.stringify(stars))
  render(
    <MuiThemeProvider>
      <App stars={stars} />
    </MuiThemeProvider>
  , document.getElementById('root'))
})

