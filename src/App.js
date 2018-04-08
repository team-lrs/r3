import React, { Component } from 'react';
import {
  UIManager,
  LayoutAnimation,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { TabNavigator } from 'react-navigation';

import Navigator from './components/Navigator';
import Map from './screens/Map/Map';
import Giveaways from './screens/Giveaways';
import Information from './screens/Information';
import communityPosts from './screens/Giveaways/posts';

// Enable animations
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

// Material UI theme (only needs to be set here - will be propagated to the app)
const uiTheme = {
  palette: {
    primaryColor: COLOR.lightGreen600,
    accentColor: COLOR.blue500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

// Main style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

/**
 * Navigation component
 */
const MainNavigation = TabNavigator({
  Map:         { screen: Map },
  Community:   { screen: Giveaways },
  Information: { screen: Information },
}, {
  tabBarPosition:  'bottom',
  tabBarComponent: props => {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Navigator navigation={props.navigation}/>
      </ThemeProvider>
    );
  }
});

/**
 * Main component
 */
export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modal:  null,
      search: '',
      communityPosts: communityPosts
    };

    // State control object
    this.controller = {
      showModal:         (modal) => { this.setState({ modal: modal }); },
      updateSearch:      (text) => { this.setState({ search: text }); },
      getCommunityPosts: () => { return this.state.communityPosts; },
      getModal:          () => { return this.state.modal; },
      getSearch:         () => { return this.state.search; }
    }
  }

  /**
   * Root component
   */
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <MainNavigation screenProps={{controller: this.controller}}/>
        </View>
      </ThemeProvider>
    );
  }
}
