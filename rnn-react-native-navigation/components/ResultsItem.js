import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Results extends Component {

  render() {
    let {result} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.item}>
            <View>{result.nick}</View>
            <View>{result.score}</View>
            <View>{result.total}</View>
            <View>{result.type}</View>
            <View>{result.date}</View>
        </View>
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
  item: {
    borderWidth: 1,
    borderColor: "black",
  }
});