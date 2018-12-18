
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { FIRST_OPEN } from './components/config';




export default class Drawer extends Component {

  state = {
    napis: 'lolo'
  }

  async componentDidMount() {
    try {
      const napis = await AsyncStorage.getItem(FIRST_OPEN)
      this.setState({napis: napis})
      console.log('user: ', napis)
    } catch (err) {
      console.log('error: ', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Drawer</Text>
        
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
});