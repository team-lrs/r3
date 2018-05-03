import { combineReducers } from 'redux'

// Import reducers from all screens
import map from './screens/Map/MapReducers'
import community from './screens/Community/CommunityReducers'
import information from './screens/Information/InformationReducers'

// Combine all reducers into a single root reducer
export default combineReducers({
  map,
  community,
  information
})
