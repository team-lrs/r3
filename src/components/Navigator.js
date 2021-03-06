import React, { Component } from 'react'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'

/**
 * Screen chooser component
 */
export default class Navigator extends Component {
  render () {
    const currentIndex = this.props.navigation.state.index
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            active={currentIndex === 0}
            onPress={() => this.props.navigation.navigate('Map')}
          >
            <Icon name='pin' />
            <Text>Recycling</Text>
          </Button>
          <Button
            vertical
            active={currentIndex === 1}
            onPress={() => this.props.navigation.navigate('Community')}
          >
            <Icon name='people' />
            <Text>Community</Text>
          </Button>
          <Button
            vertical
            active={currentIndex === 2}
            onPress={() => this.props.navigation.navigate('Information')}
          >
            <Icon name='information-circle' />
            <Text>Information</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
