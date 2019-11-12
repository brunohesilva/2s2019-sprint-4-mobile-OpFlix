import React, {Component} from 'react';
import {Text, View, Image, StyleSheet } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class Main extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image 
        source={require("../assets/img/MovieIcon.png")}
        // style={{ width: 25, height: 25, tintColor: '#FF5A01'}}
        style={style.tabNavigationMovieIcon}
      />  
    )
  }

  constructor() {
    super();
    this.state = {
      lancamentos: [],
    };
  }

  componentDidMount() {
    this._carregarlancamentos();
  }

  _carregarlancamentos = async () => {
    await fetch('http://192.168.4.209:5000/api/lancamentos')
      .then(resposta => resposta.json())
      .then(data => this.setState({lancamentos: data}))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <FlatList
        data={this.state.lancamentos}
        keyExtractor={item => item.idLancamento}
        renderItem={({item}) => (
          <View>
            <Text style={{color: 'red'}}>{item.idLancamento}</Text>
            <Text style={{color: 'red'}}>{item.titulo}</Text>
            <Text style={{color: 'red'}}>{item.sinopse}</Text>
            <Text style={{color: 'red'}}>{item.tempoDuracao}</Text>
            <Text style={{color: 'red'}}>{item.filmeSerie}</Text>
            <Text style={{color: 'red'}}>{item.dataLancamento}</Text>
            <Text style={{color: 'red'}}>{item.idCategoriaNavigation === undefined ? 'null' : item.idCategoriaNavigation.categoria}</Text>
          </View>
        )}
      />
    );
  }
}

const style = StyleSheet.create({
  tabNavigationMovieIcon: {
    width: 25,
    height: 25,
    tintColor: '#FF5A01'
  }
})

export default Main;