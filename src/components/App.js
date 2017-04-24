// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { Container, UncontrolledAlert } from 'reactstrap'
// import {styles} from '../styles/styles.css'
import MyComponent from './MyComponent'

const keyframes = {
  '0%': {fontSize: 12},
  '50%': {fontSize: 16},
  '100%': {fontSize: 12},
}

const styles = StyleSheet.create({
    red: {
        ':hover': {
            color: 'red',
        },
    },

    small: {
        '@media (max-width: 600px)': {
            backgroundColor: 'red',
        },
    },
    animate: {
      animation: 'x 6s ease 0s infinite',
      animationName: keyframes,
    },
})

//NOTE: kept this as a class to show that lint gives you a hint when you should
//write components as pure functions (stateless components)
const App = inject('appStore')(observer(({ appStore }) => {

  const { name, description } = appStore

  return (
    <Container fluid >
      <div className="project">
        <UncontrolledAlert color="success">
          <strong>Well done!</strong> You successfully read this important alert message.
        </UncontrolledAlert>
        <h2 className={css(styles.red)}>Welcome to the {name} project!!!</h2>
        <h3 className={css(styles.animate)}>This project is a {description}.</h3>
        <MyComponent />
      </div>
    </Container>
  )
}))

App.wrappedComponent.propTypes = {
  appStore: PropTypes.object.isRequired,
}

export default App
