import React, { Component } from 'react';
import { Text, View, AsyncStorage, Picker, TouchableOpacity, Image, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import logout from '../assets/img/ExitIcon.png';

class FilterDate extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
          <Image
            source={require('../assets/img/CalendarIcon.png')}
            style={styles.tabNavigationFilterDateIcon}
          />
        )
      }
    
      constructor(props) {
        super(props);
        this.state = {
          lancamentos: [],
          listaFiltrada: [],
          DataEscolhida: null,
          // datas: [
          //   { idData: 1, data: '03-10-19' },
          //   { idData: 2, data: '25-04-19' },
          // ],
          // listaDeDatas = lancamentos.dataLancamento,
        }
      }
    
      componentDidMount() {
        this._carregarDataLancamento();   
      }
    
      _logout = async () => {
        this.props.navigation.navigate('AuthStack');
      }
    
      _filtroData = async () => {
        await fetch('http://192.168.4.209:5000/api/lancamentos/filtroData/' + this.state.DataEscolhida, {
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
    
      _carregarDataLancamento = async () => {
        await fetch('http://192.168.4.209:5000/api/lancamentos', {
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
    
      _alterarData = async (item) => {
        this.setState({ listaFiltrada: this.state.lancamentos.filter(x => x.dataLancamento == item) })
      }
    
      render() {
        return (
          <ScrollView style={styles.main}>
            <View style={styles.mainHeader}>
            <View style={styles.mainHeaderRow}>
            <Image 
                source={require("../assets/img/LupaIcon.png")}
                style={styles.mainHeaderImg}
                />
                <Text style={styles.mainHeaderText}>{"Filtro Data".toUpperCase()}</Text>
              <TouchableHighlight onPress={() => this._logout()}>
                <Image source={logout}
                style={styles.exitButtom}/>
              </TouchableHighlight>
            </View>
            <View style={styles.mainHeaderLine} />
                </View>
                
            <View style={styles.mainBody}>
              <Text style={styles.textTitulo}>Filtrar lançamentos por Data de Lançamento</Text>
              <Picker selectedValue={this.state.DataEscolhida} onValueChange={this._alterarData} style={styles.textContent}>
                <Picker.Item label="Escolha uma Data:" value="0" />
                {this.state.lancamentos.map(e => {
                  return (<Picker.Item label={e.dataLancamento} value={e.dataLancamento} />
                  )
                })}
              </Picker>
              <ScrollView>
                <FlatList 
                  data={this.state.listaFiltrada}
                  keyExtractor={item => item.idLancamento}
                //   renderItem={({ item }) => (
                //     <View>
                //       <Text>Titulo: {item.titulo}</Text>
                //       <Text>Sinopse: {item.sinopse}</Text>
                //     </View>
                //   )}
                contentContainerStyle={styles.mainBodyConteudo}
                renderItem={this.renderizaItem}
                />
                <TouchableOpacity
                  onPress={this._filtroData}>
                  {/* <Text style={styles.textButtom}>Go!</Text> */}
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ScrollView>
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


const styles = StyleSheet.create({
    tabNavigationFilterDateIcon: {
      width: 25,
      height: 25,
      tintColor: '#FFFFFF'
    },
    exitButtom: {
        width: 35,
        height: 35,
        tintColor: '#FF5A01',
        marginLeft: 370,
        marginTop: 10
    },
    main: {
        flex: 1,
        backgroundColor: "#000000"
      },
      // mainHeaderRow: {
      //   flexDirection: "row"
      // },
      mainHeader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      mainHeaderImg: {
        width: 22,
        height: 22,
        tintColor: "#FF5A01",
        marginLeft: 110,
        marginTop: 45,
        position: "absolute"
      },
      mainHeaderText: {
        fontSize: 15,
        letterSpacing: 5,
        color: "#FF5A01",
        fontFamily: "Franklin Gothic",
        fontWeight: 'bold',
        position: "absolute",
        marginTop: 45,
        marginLeft: 135
      },
      mainHeaderLine: {
        width: 170,
        paddingTop: 30,
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
        marginLeft: 60,
        marginTop: 100,
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
      }
})

export default FilterDate