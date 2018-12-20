import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, TouchableOpacity} from 'react-native';
import { FIRST_OPEN } from './components/config';




export default class Result extends Component {

goHome = () => {

}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Koniec quizu</Text>
        <Text style={styles.points}>Zdobytych punktów {this.props.points}</Text>
        <Text style={styles.points}>na {this.props.questCount} możliwych</Text>
        <TouchableOpacity 
          onPress={this.goHome}>
          <Text style={styles.nextQuest}>Strona główna</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  points: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'blue'
  },
  name: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
    marginBottom: 7
  },
  nextQuest: {
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'orange',
    width: 250
  },
});