import React, {Component} from 'react';
import {Text, View, Image, StyleSheet } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class Main extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image 
        source={require("../assets/img/MovieIcon.png")}
        // style={{ width: 25, height: 25, tintColor: '#FF5A01'}}
        style={styles.tabNavigationMovieIcon}
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
      <View style={styles.main}>
        <View style={styles.mainHeader}>
        <View style={styles.mainHeaderRow}>          
          <Image 
                source={require("../assets/img/ListIcon.png")}
                style={styles.mainHeaderImg}
                />
              <Text style={styles.mainHeaderText}>{"Lançamentos".toUpperCase()}</Text>
        </View>
          <View style={styles.mainHeaderLine} />
        </View>
        <View style={styles.mainBody}>
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
        </View>
      </View>           
    );
  }
}
const styles = StyleSheet.create({
  tabNavigationMovieIcon: {
    width: 25,
    height: 25,
    // tintColor: '#FF5A01'
    tintColor: '#FFFFFF'
  },
  main: {
    flex: 1,
    backgroundColor: "#27FF01"
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
    marginRight: -9,
    marginTop: -9
  },
  mainHeaderText: {
    fontSize: 16,
    letterSpacing: 5,
    color: "#FFFFFF",
    fontFamily: "Franklin Gothic"
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
    color: "#333",
    fontFamily: "Franklin Gothic"
  },
  flatItemTitulo: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Franklin Gothic"
  },
  flatItemSinopse: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Franklin Gothic"
  },
  flatItemTempoDuracao: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Franklin Gothic"
  },
  flatItemFilmeOuSerie: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Franklin Gothic"
  },
  flatItemDataLancamento: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Franklin Gothic"
  },
  flatItemCategoria: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Franklin Gothic"
  },
  flatItemData: {
    fontSize: 10,
    color: "#999",
    lineHeight: 24
  },
  flatItemImg: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  flatItemImgIcon: {
    width: 22,
    height: 22,
    tintColor: "#FF5A01"
  }
})

export default Main;