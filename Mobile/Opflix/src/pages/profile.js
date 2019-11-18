import React, {Component} from 'react';
import {Text, AsyncStorage, View, Image, StyleSheet} from 'react-native';

class Profile extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image 
        source={require("../assets/img/ProfileIcon.png")}
        // style={{ width: 25, height: 25, tintColor: '#FF5A01'}}
        style={styles.tabNavigationProfileIcon}

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
      <View style={styles.main}>
        <View style={styles.mainHeader}>
        <View style={styles.mainHeaderRow}>
          <Image
                source={require("../assets/img/UserIcon.png")}
                style={styles.mainHeaderImg}
                />
                 <Text style={styles.mainHeaderText}>{"Perfil".toUpperCase()}</Text>
        </View>
        <View style={styles.mainHeaderLine} /> 
        </View>
        <View style={styles.mainBody}>
      <Text style={{color: '#FF5A01'}}>{this.state.token}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabNavigationProfileIcon: {
    width: 25,
    height: 25,
    // tintColor: '#FF5A01'
    tintColor: '#FFFFFF'
  },
  main: {
    flex: 1,
    backgroundColor: "#000000"
  },
  mainHeaderRow: {
    flexDirection: "row"
  },
  mainHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mainHeaderImg: {
    width: 22,
    height: 22,
    tintColor: "#FF5A01",
    marginRight: 10,
    marginTop: -3
  },
  mainHeaderText: {
    fontSize: 15,
    letterSpacing: 5,
    color: "#FF5A01",
    fontFamily: "Franklin Gothic"
  },
  mainHeaderLine: {
    width: 170,
    paddingTop: 10,
    borderBottomColor: "#999999",
    borderBottomWidth: 0.9,
  },
  mainBody: {
    flex: 4,

  }
})

export default Profile;