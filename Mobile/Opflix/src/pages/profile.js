import React, {Component} from 'react';
import {Text, AsyncStorage, View, Image, StyleSheet} from 'react-native';

class Profile extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image 
        source={require("../assets/img/ProfileIcon.png")}
        // style={{ width: 25, height: 25, tintColor: '#FF5A01'}}
        style={style.tabNavigationProfileIcon}

      />  
    )
  }

  constructor() {
    super();
    this.state = {
      token: null,
    };
  }

  componentDidMount() {
    this._buscarDadosDoStorage();
  }

  _buscarDadosDoStorage = async () => {
    try {
      const tokenDoStorage = await AsyncStorage.getItem('@opflix:token');
      if (tokenDoStorage != null) {
        this.setState({token: tokenDoStorage});
      }
    } catch (error) {}
  };

  render() {
    return (
      <View>
        <Text>{this.state.token}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  tabNavigationProfileIcon: {
    width: 25,
    height: 25,
    // tintColor: '#FF5A01'
    tintColor: '#FFFFFF'
  }
})

export default Profile;