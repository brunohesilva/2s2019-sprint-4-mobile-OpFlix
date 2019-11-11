import React, {Component} from 'react';
import {Text, AsyncStorage, View} from 'react-native';

class Profile extends Component {
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

export default Profile;