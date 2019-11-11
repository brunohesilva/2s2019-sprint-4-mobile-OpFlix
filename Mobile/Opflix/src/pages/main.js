import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class Main extends Component {

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
            <Text>{item.idLancamento}</Text>
            <Text>{item.titulo}</Text>
            <Text>{item.sinopse}</Text>
            <Text>{item.tempoDuracao}</Text>
            <Text>{item.filmeSerie}</Text>
            <Text>{item.dataLancamento}</Text>
            <Text>{item.idCategoriaNavigation === undefined ? 'null' : item.idCategoriaNavigation.categoria}</Text>
          </View>
        )}
      />
    );
  }
}

export default Main;