/* eslint-env jest */

import 'react-native'
import React from 'react'
import App from '../App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create( // eslint-disable-line no-unused-vars
    <App />
  )
})
