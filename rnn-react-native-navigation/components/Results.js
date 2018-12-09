import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, RefreshControl, ListView, 
AsyncStorage} from 'react-native';
import ResultItem from './ResultsItem';
import { __await } from 'tslib';

const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});

export default class Results extends Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
      tableHead: ['Head1', 'Head2', 'Head3', 'Head4'],
      //dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2}),
      dataSource: ds.cloneWithRows ([
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        },
        {
          nick: 'Marek',
          score: 18,
          total: 20,
          type: 'historia',
          date: '2018-11-22'
        }
      ]),
    };
  }

  _renderRow(rowData){
    return (
      <View style={styles.container}>
        <View style={styles.rows}>
          <Text style={styles.column}>{rowData.nick}</Text>
          <Text style={styles.column}>{rowData.score}</Text>
          <Text style={styles.column}>{rowData.total}</Text>
          <Text style={styles.column}>{rowData.type}</Text>
          <Text style={styles.column}>{rowData.date}</Text>
        </View>
      </View>
    )
  }
/*
  componentWillMount(){
    this.setState({ dataSource:
      this.state.dataSource.cloneWithRows(this.state.cars) })
  }
  */

  fetchData = async() => {
    try {
      var results = await AsyncStorage.getItem('results');
      results = JSON.parse(results);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
      this.setState({ dataSource: ds.cloneWithRows(results) });
      this._renderRow();
    }catch (error){

    }
      
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container1}>
        <View style={styles.header}>
          <Text style={styles.column1}>Age</Text>
          <Text style={styles.column1}>Score</Text>
          <Text style={styles.column1}>Total</Text>
          <Text style={styles.column1}>Type</Text>
          <Text style={styles.column1}>Date</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  container1: {
    flex: 1,
    marginTop: 50
  },
  header: {
    flexDirection: 'row'
  },
  rows: {
    flexDirection: 'row'
  },
  column: {
    width: 85,
    padding: 15,
    borderWidth: 1,
    fontWeight: 'bold',
    backgroundColor: 'white'
  },
  column1: {
    width: 85,
    padding: 15,
    borderWidth: 1,
    backgroundColor: 'deepskyblue'
  },
});