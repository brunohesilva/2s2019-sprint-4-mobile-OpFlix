import React, {Component} from 'react';
import {Text, View, Image, StyleSheet } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class Filter extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image 
        source={require("../assets/img/FilterIcon.png")}
        // style={{ width: 25, height: 25, tintColor: '#FF5A01'}}
        style={style.tabNavigationFilterIcon}
      />  
    )
  }

  constructor() {
    super();
    this.state = {
      lancamentos: [],
    };
  }

  render() {
    return (
      <Text>Filter</Text>
    );
  }
}

const style = StyleSheet.create({
  tabNavigationFilterIcon: {
    width: 25,
    height: 25,
    // tintColor: '#FF5A01'
    tintColor: '#FFFFFF'
  }
})

export default Filter;