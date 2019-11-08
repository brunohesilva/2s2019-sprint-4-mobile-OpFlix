import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Main extends Component {

    // static navigationOptions = {
    //     tabBarIcon: () => (
    //         <Image
    //             source={require('../assets/img/MovieIcon.png')}
    //             style={styles.tabBarNavigatorIcon}
    //         />
    //     ),
    // };

    constructor() {
        super();
        this.state = {
            lancamentos: [],
        };
    }

    // componentDidMount() {
    //     this._carregarLancamentos();
    // }

    // _carregarLancamentos = async () => {
    //     await fetch('http://192.168.4.209:5000/api/lancamentos')
    //         .then(resposta => resposta.json())
    //         .then(data => this.setState({ lancamentos: data }))
    //         .catch(erro => console.warn(erro));
    // };

    render() {
        return (
            <Text>Agora Vai Porra</Text>
            // <FlatList
            //     data={this.state.lancamentos}
            //     keyExtractor={item => item.IdLancamento}
            //     renderItem={({ item }) => (
            //         <View>
            //             <Text>{item.IdLancamento}</Text>
            //             <Text>{item.Titulo}</Text>
            //             <Text>{item.Sinopse}</Text>
            //             <Text>{item.TempoDuracao}</Text>
            //             <Text>{item.FilmeSerie}</Text>
            //             <Text>{item.DataLancamento}</Text>
            //             <Text>{item.idCategoriaNavigation === undefined ? 'null' : item.idCategoriaNavigation.categoria}</Text>
            //         </View>
            //     )}
            // />
        );
    }
}

const styles = StyleSheet.create({
    tabBarNavigatorIcon: { width: 25, height: 25, tintColor: 'white' }
});

export default Main;
