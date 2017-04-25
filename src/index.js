import React from 'react'
import { AxiosProvider } from 'react-axios'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Redbox from 'redbox-react'
import a11y  from 'react-a11y'
import { Provider } from 'mobx-react'
import Store from './stores/Store'
import App from './components/App'
import {whyDidYouUpdate} from 'why-did-you-update'

const appStore = new Store()

const consoleErrorReporter = ({error}) => {
  console.error(error)
  return <Redbox error={error} />
}

consoleErrorReporter.propTypes = {
  error: PropTypes.error,
}

if(process.env.NODE_ENV === 'development') {
  a11y(React)
  whyDidYouUpdate(React)
  // You can include and exclude components:
  // whyDidYouUpdate(React, { include: /^pure/, exclude: /^Connect/ })
}

render(
  <AppContainer>
    <AxiosProvider>
      <Provider appStore={appStore}>
        <App appStore={appStore} />
      </Provider>
    </AxiosProvider>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    let AppNext = require('./components/App').default
    render(
      <AppContainer>
        <AxiosProvider>
          <Provider appStore={appStore}>
            <AppNext />
          </Provider>
        </AxiosProvider>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
