import { createAppContainer } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import MainScreen from './pages/main'
import ProfileScreen from './pages/profile'

const MainNavigator = createBottomTabNavigator(
    {
        Main: {
            screen: MainScreen
        },
        ProfileScreen: {
            screen: ProfileScreen
        }
    }
);

export default createAppContainer(MainNavigator)