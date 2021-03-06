import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import MapView from 'react-native-maps'

import MainToolbar from '../../components/MainToolbar'
import mapSpots from './spots.json'

/**
 * Map screen component
 */
class MapScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      latitude: null,
      longitude: null,
      error: null
    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  render () {
    return (
      <MapView style={styleMap.map}
        region={{
          // latitude: 37.015589,
          // longitude: -7.933262,
          latitude: this.state.latitude || 0.0,
          longitude: this.state.longitude || 0.0,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        }}
      >

        {mapSpots.map((spot, index) => {
          let title, description, imageSource
          switch (spot.type) {
            case 'eco':
              title = 'Recycle center'
              description = 'Available: Paper, Plastic, Glass'
              imageSource = require('./img/map-pin-eco.png')
              break
            case 'battery':
              title = 'Battery'
              description = 'Battery drop point'
              imageSource = require('./img/map-pin-battery.png')
              break
            case 'oil':
              title = 'Oil waste'
              description = 'Oil drop point'
              imageSource = require('./img/map-pin-oil.png')
              break
          }
          return (
            <MapView.Marker
              coordinate={{
                latitude: spot.latitude,
                longitude: spot.longitude
              }}
              title={title}
              description={description}
              key={spot.key}
            >
              <Image
                style={{width: 50, height: 50}}
                source={imageSource}
              />
            </MapView.Marker>
          )
        })}

      </MapView>
    )
  }
}

MapScreen.navigationOptions = ({
  navigation,
  navigationOptions,
  screenProps
}) => ({
  header: (
    <MainToolbar
      navigation={navigation}
      title='Recycling spots'
      search={{
        placeholder: 'Search',
        onChange: text => screenProps.controller.updateSearch(text),
        onClose: () => screenProps.controller.updateSearch('')
      }}
    />
  )
})

export default MapScreen

const styleMap = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
