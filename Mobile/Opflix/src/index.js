import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'

import MainScreen from './pages/main'
import ProfileScreen from './pages/profile'
import SignInScreen from './pages/signin'

const AuthStack = createStackNavigator({ Sign: { screen: SignInScreen } })

const MainNavigator = createBottomTabNavigator(
    {
    Main: {
        screen: MainScreen
    },
    Profile: {
        screen: ProfileScreen
    }
})

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