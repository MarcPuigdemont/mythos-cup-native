import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import MythosCupsList from './views/MythosCupsList';
import CreateMythosCup from './views/CreateMythosCup';
import Settings from './views/Settings';
import PlayMythosCup from './views/Play';

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
  'Settings': 'Settings'
};

const ListNavigator = createStackNavigator({
  MythosCupsList: { screen: MythosCupsList },
  PlayMythosCup: { screen: PlayMythosCup },
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
});

const App = createAppContainer(MainNavigator);

export default () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
