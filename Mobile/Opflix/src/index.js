import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'

import MainScreen from './pages/main'
import ProfileScreen from './pages/profile'
import SignInScreen from './pages/signin'
import FilterScreen from './pages/filter'

const AuthStack = createStackNavigator({ Sign: { screen: SignInScreen } })

const MainNavigator = createBottomTabNavigator(
    {
      Main: {
        screen: MainScreen,
      },
      Profile: {
        screen: ProfileScreen,
      },
      Filter: {
          screen: FilterScreen,
      }
    },
    {
      initialRouteName: 'Main',
      swipeEnabled: false,
      tabBarOptions: {
        showIcon: true,
        showLabel: false,
        inactiveBackgroundColor: '#FF5A01',
        activeBackgroundColor: '#01A6FF',
        style: {
          width: '100%',
          height: 50,
        },
      },
    },
  );

export default createAppContainer(
    createSwitchNavigator(
        {
            MainNavigator,
            AuthStack
        },
        {
            initialRouteName: 'AuthStack'
        }
    )
)