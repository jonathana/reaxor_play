// @flow

import React from 'react'
import { Get } from 'react-axios'
import PropTypes from 'prop-types'
import { css, StyleSheet } from 'aphrodite'
// import {styles} from '../styles/styles.css'
import { inject, observer } from 'mobx-react'
import { Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button } from 'reactstrap'

const styles = StyleSheet.create({
    odd: {
      color: 'white',
      background: 'blue',
    },

    even: {
      color: 'blue',
      background: 'white',
    },
})

const MyComponent = inject('appStore')(observer(({ appStore }) => {
  const {clickButton, numClicks, oddOrEven} = appStore
  return (
    <div className="MyComponent">
      <div className="col col-md-4">
        <Card>
          <CardImg
            alt="Card pic cap"
            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
            top
            width="100%"
          />
          <CardBlock>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Get url="http://www.cnn.com/">
              {(error, response, isLoading) => {
                if(error) {
                  return (<div>Something bad happened: {error.message}</div>)
                } else if(isLoading) {
                  return (<div>Loading...</div>)
                } else if(response !== null) {
                  return (<div>{response.data.message}</div>)
                }
                return (<div>Default message before request is made.</div>)
              }}
            </Get>
            <Button
              color="primary"
              onClick={clickButton}
            >
              Click me!
            </Button>
            <h4>You've clicked the button {numClicks} times!</h4>
            <h5>You've clicked button an <span className={css(styles[oddOrEven])}>{oddOrEven}</span> number of times.</h5>
          </CardBlock>
        </Card>
      </div>
    </div>
  )
}))

MyComponent.wrappedComponent.propTypes = {
  appStore: PropTypes.object.isRequired,
}

export default MyComponent
