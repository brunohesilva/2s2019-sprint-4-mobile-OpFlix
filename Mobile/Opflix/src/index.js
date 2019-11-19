import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { ActivityIndicator, StyleSheet, Text, View, } from 'react-native'

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
        activeBackgroundColor: '#ff8849',
        style: {
          width: '100%',
          height: 50,
        },
      },
      render() {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
            <ActivityIndicator size="small" color="#00ff00" />
            <ActivityIndicator size="large" color="#0000ff" />
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        )
      }
    },
    
    );
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
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

