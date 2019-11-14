import React, { Component } from 'react';
import { Text, View, AsyncStorage, Picker, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lancamentos: [
      ],
      categoriaEscolhida: null,
      categorias: []
    }
  }

  componentDidMount() {
    // this._carregarLancamentos();
    this._carregarCategorias();
  }

  _carregarLancamentos = async () => {
    await fetch('http://192.168.4.209:5000/api/lancamentos/listar/categoria/' + this.state.categoriaEscolhida, {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      },
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ lancamentos: data }))
      .catch(erro => console.warn(erro))
  }
  _carregarCategorias = async () => {
    await fetch('http://192.168.4.209:5000/api/categorias', {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
      }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ categorias: data }))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (

      <View>
        <Text>Filtrar lançamentos por categoria</Text>
        <Picker selectedValue={this.state.categoriaEscolhida} onValueChange={(itemValue) => this.setState({ categoriaEscolhida: itemValue })}>
          <Picker.Item label="Escolha a plataforma:" value="0" selectedValue />
          {this.state.categorias.map(e => {
            return (<Picker.Item label={e.categoria} value={e.idCategoria} />
            )
          })}
        </Picker>
        <TouchableOpacity onPress={this._carregarLancamentos}>
          <Text>Buscar</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.lancamentos}
          keyExtractor={item => item.idLancamento}
          renderItem={({ item }) => (
            <View>

              <Text>Titulo: {item.titulo}</Text>
              <Text>Sinopse: {item.sinopse}</Text>
            </View>
          )}
        />
      </View>
    )
  }
}

export default Filter;