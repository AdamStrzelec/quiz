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
      res: 0,
      tableHead: ['Head1', 'Head2', 'Head3', 'Head4'],
      
      dataSource: ds.cloneWithRows ([
 
      ]),
    };
  }

  componentDidMount = () =>{
    return fetch('https://pwsz-quiz-api.herokuapp.com/api/results')
      .then(response => response.json())
      .then(json => this.setState({dataSource: ds.cloneWithRows(json)}))
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


  fetchData = async() => {
    try {
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