import React, { Component } from 'react';
import { Text, View, AsyncStorage, Picker, TouchableOpacity, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import logout from '../assets/img/ExitIcon.png';

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

  static navigationOptions = {
    tabBarIcon: () => (
      <Image 
        source={require("../assets/img/FilterIcon.png")}
        // style={{ width: 25, height: 25, tintColor: '#ffffff'}}
        style={styles.tabNavigationFilterIcon}
        />
    )
  } 

  componentDidMount() {
    // this._carregarLancamentos();
    this._carregarCategorias();
  }

  _logout = async () => {
    this.props.navigation.navigate('AuthStack');
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
      <View style={styles.main}>
        <View style={styles.mainHeader}>
              <TouchableHighlight onPress={() => this._logout()}>
                <Image source={logout}
                style={styles.exitButtom}/>
              </TouchableHighlight>
        <View style={styles.mainHeaderRow}>
        <Image 
                source={require("../assets/img/LupaIcon.png")}
                style={styles.mainHeaderImg}
                />
              <Text style={styles.mainHeaderText}>{"Filtro".toUpperCase()}</Text>
        </View>
        <View style={styles.mainHeaderLine} />
        </View>
        <View style={styles.mainBody}>
        <Text style={styles.textTitulo} >Filtrar lançamentos por categoria</Text>
        <Picker selectedValue={this.state.categoriaEscolhida} onValueChange={(itemValue) => this.setState({ categoriaEscolhida: itemValue })} style={styles.textContent}>
          <Picker.Item label="Escolha a categoria:" value="0" selectedValue />
          {this.state.categorias.map(e => {
            return (<Picker.Item label={e.categoria} value={e.idCategoria} />
            )
          })}
        </Picker>
        <TouchableOpacity onPress={this._carregarLancamentos}>
          {/* <Text style={styles.textButtom}>Go!</Text> */}
        </TouchableOpacity>
        <FlatList
          data={this.state.lancamentos}
          keyExtractor={item => item.idLancamento}
          // renderItem={({ item }) => (
          //   <View>

          //     <Text>Titulo: {item.titulo}</Text>
          //     <Text>Sinopse: {item.sinopse}</Text>
          //   </View>
          // )}
          contentContainerStyle={styles.mainBodyConteudo}
          renderItem={this.renderizaItem}
        />
        </View>
      </View>
    );
  }

  renderizaItem = ({ item }) => (
    <View style={styles.flatItemLinha}>
      <View style={styles.flatItemContainer}>
      <Text style={styles.flatItemTitulo}>{item.titulo}</Text>
      <Text style={styles.flatItemSinopse}>{item.sinopse}</Text>
      </View>
    </View>
  )
}

const styles =StyleSheet.create({
  tabNavigationFilterIcon: {
    width: 25,
    height: 25,
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
    alignItems: "center",

  },
  mainHeaderImg: {
    width: 22,
    height: 22,
    tintColor: "#FF5A01",
    marginRight: 5,
    marginTop: -3
  },
  mainHeaderText: {
    fontSize: 15,
    letterSpacing: 5,
    color: "#FF5A01",
    fontFamily: "Franklin Gothic",
    fontWeight: 'bold'
  },
  mainHeaderLine: {
    width: 170,
    paddingTop: 10,
    borderBottomColor: "#999999",
    borderBottomWidth: 0.9
  },
  mainBody: {
    flex: 4
  },
  mainBodyConteudo: {
    paddingTop: 30,
    paddingRight: 50,
    paddingLeft: 50
  },
  flatItemLinha: {
    flexDirection: "row",
    borderBottomWidth: 0.9,
    borderBottomColor: "gray"
  },
  flatItemContainer: {
    flex: 7,
    marginTop: 5
  },
  flatItemIdTitulo: {
    fontSize: 14,
    color: "#FF5A01",
    fontFamily: "Franklin Gothic"
  },
  flatItemTitulo: {
    fontSize: 14,
    color: "#FF5A01",
    fontFamily: "Franklin Gothic"
  },
  flatItemSinopse: {
    fontSize: 14,
    color: "#FF5A01",
    fontFamily: "Franklin Gothic"
  },
  flatItemData: {
    fontSize: 10,
    color: "#FF5A01",
    lineHeight: 24
  },
  textTitulo: {
    color: "#FF5A01",
    marginLeft: 100,
    marginTop: 10,
    fontWeight: 'bold',
  },
  textContent: {
    color: "#FF5A01",
    marginLeft: 120,
    marginTop: 25,
    fontWeight: 'bold'
  },
  textButtom: {
    color: "#FF5A01",
    marginLeft: 180,
    marginTop: 25,
    fontWeight: 'bold'
  },
  exitButtom: {
    width: 35,
    height: 35,
    tintColor: '#FF5A01',
    marginLeft: 370,
}
})

export default Filter;