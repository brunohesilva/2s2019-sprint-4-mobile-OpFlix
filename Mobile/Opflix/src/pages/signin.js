import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';

class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      email: 'erik@email.com',
      senha: "123456  ",
    };
  }

  _realizarLogin = async () => {
    fetch('http://192.168.4.209:5000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
      }),
    })
      .then(resposta => resposta.json())
      .then(data => this._irParaHome(data.token))
      .catch(erro => console.warn('deu ruim' + erro));
  };

  _irParaHome = async tokenRecebido => {
    if (tokenRecebido != null) {
      try {
        await AsyncStorage.setItem('@opflix:token', tokenRecebido);
        this.props.navigation.navigate('MainNavigator');
      } catch (error) {}
    }
  };

  render() {
    return (
      <ImageBackground
          source={require("../assets/img/WPLogin.jpeg")}
          style={StyleSheet.absoluteFillObject}
        >
          <View style={styles.overlay} />
          <View style={styles.main} >
              <Image
                  source={require("../assets/img/LogoIcon2x.png")}
                  style={styles.mainImgLogin}
              />
              <TextInput
                style={styles.inputLogin}
                placeholder="email"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
                placeholderTextColor="#FFFFFF"
                underlineColorAndroid="#FFFFFF"
              />
              <TextInput
                style={styles.inputLogin}
                placeholder="senha"
                onChangeText={senha => this.setState({senha})}
                value={this.state.senha}
                password="true"
                placeholderTextColor="#FFFFFF"
                underlineColorAndroid="#FFFFFF"
              />
              <TouchableOpacity
                  style={styles.btnLogin} 
                  onPress={this._realizarLogin}
              >
                  <Text style={styles.btnLoginText}>Go!</Text>
              </TouchableOpacity>
            </View>            
        </ImageBackground>
    ) 
  }
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 90, 1, 1)"
  },
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  mainImgLogin: {
    height: 100,
    width: 90,
    margin: 10,
    marginBottom: 50

  },
  btnLogin: {
    height: 38,
    shadowColor: "rgba(0,0,0, 0.4)",
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
    width: 240,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btnLoginText: {
    fontSize: 12,
    fontFamily: "Franklin Gothic",
    color: "#FF5A01",
    letterSpacing: 4,
    fontWeight: 'bold',
    
  },
  inputLogin: {
    width: 240,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 'bold'
  }
})

export default SignIn;