import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { StoreContext } from 'redux-react-hook';
import { Ionicons } from '@expo/vector-icons';

import { ICup } from './interfaces';

import MythosCupsList from './views/MythosCupsList';
import CreateMythosCup from './views/CreateMythosCup';
import EditMythosCup from './views/EditMythosCup';
import ConfigureMythosCup from './views/ConfigureMythosCup';
import Settings from './views/Settings';
import PlayMythosCup from './views/Play';

import initStore from './utils/store';
import { loadState, saveState } from './utils/localStorage';
import { setCups } from './actions/cups';

const theme = {
  Button: {
    buttonStyle: {
      backgroundColor: '#673ab7',
    },
    titleStyle: {
      color: 'white',
    },
  },
};

const routeLabel = {
  'MythosCupsList': 'Mythos Cups',
  'CreateMythosCup': 'Create',
  'EditMythosCup': 'Edit',
  'Settings': 'Settings'
};

const ListNavigator = createStackNavigator({
  MythosCupsList: { screen: MythosCupsList },
  PlayMythosCup: { screen: PlayMythosCup },
  EditMythosCup: { screen: EditMythosCup },
  ConfigureMythosCup: { screen: ConfigureMythosCup },
});

const MainNavigator = createBottomTabNavigator({
  CreateMythosCup: createStackNavigator({ CreateMythosCup: { screen: CreateMythosCup }}),
  MythosCupsList: ListNavigator,
  Settings: createStackNavigator({ Settings: { screen: Settings }}),
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'MythosCupsList') {
        iconName = `ios-cafe`;
      } else if (routeName === 'CreateMythosCup') {
        iconName = `ios-add-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options`;
      }

      return (<Ionicons name={iconName} size={25} color={tintColor} />);
    },
    tabBarLabel: routeLabel[navigation.state.routeName],
  }),
  tabBarOptions: {
    activeTintColor: '#673ab7',
    inactiveTintColor: 'gray',
  },
  initialRouteName: 'MythosCupsList',
});

const App = createAppContainer(MainNavigator);

const cups: ICup[] = [
  {
    id: '1',
    campaign: 'Fest for Umorhoth',
    difficulty: 'Easy',
    icon: 2,
    tokens: null,
  },
  {
    id: '2',
    campaign: 'Fest for Umorhoth',
    difficulty: 'Not that hard',
    icon: 4,
    tokens: null,
  },
  {
    id: '3',
    campaign: 'Whispers in the dark',
    difficulty: 'Hard',
    icon: 7,
    tokens: null,
  },
];
const initialState = { cups: [] }; 
const store = initStore(initialState);
store.subscribe(() => {
  saveState({
    cups: store.getState().cups
  });
});
loadState().then(state => {
  if (state.cups) {
    store.dispatch(setCups(state.cups));
  }
});

export default () => (
  <ThemeProvider theme={theme}>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </ThemeProvider>
);
