import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null
  };

  render(){
    let quiz = [
      {quizNumber: 'test #1', quizDescription: 'sadsadadssadsad', quizContent: 'zawartosc quiz 1'},
      {quizNumber: 'test #2', quizDescription: 'sadsadadssadsad', quizContent: 'zawartosc quiz 2'},
      {quizNumber: 'test #3', quizDescription: 'sadsadadssadsad', quizContent: 'zawartosc quiz 3'},

    ]

    let quizes = []
    const { navigate } = this.props.navigation;
    for(let i=0; i<quiz.length; i++){
      quizes.push(
        <View style={styles.quiz}>

        <View ><TouchableOpacity onPress={() => navigate('Profile', {number: quiz[i].quizNumber, content: quiz[i].quizContent})}>
        <Text style={styles.title}>
          Title {quiz[i].quizNumber}
        </Text></TouchableOpacity>
        </View>

        <View><Text style={styles.tag}>Tag#1 Tag#2</Text></View>

        <View><Text>{quiz[i].quizDescription}</Text></View>
        </View>
      )
    }
    return(
      <View >
        <View>
        <ScrollView>{quizes}</ScrollView>
        </View>
        <View style={styles.check}>
          <Text style={styles.checkTitle}>Get to Know your rank result</Text>
          <TouchableOpacity onPress={() => navigate('Result')}>
            <Text style={styles.checkBtn}>
            Check!
          </Text></TouchableOpacity>
        </View>
        
      </View>
    );
  }
}



class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
    header: null
  };
  
  render(){
    var {params} = this.props.navigation.state;
    return(
      <View>
        <Text>{params.number}</Text>
        <Text>{params.content}</Text>
      </View>
    );
  }
}




class ResultScreen extends Component {
  static navigationOptions = {
    title: 'Result',

  };
  
  render(){
    var {params} = this.props.navigation.state;
    return(
      <View>
        <Text>Result</Text>
      </View>
    );
  }
}

export default StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Result: { screen: ResultScreen },
}, {initialRouteName: 'Home'});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    justifyContent: 'center',
    marginTop: 9,
    marginBottom: 9,
  },
  tag: {
    
    marginBottom: 9,
    color: 'blue',
    fontSize: 15,
  },
  quiz: {
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 7,
    marginRight: 7,
    borderWidth: 1,
    borderColor: 'black',
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  check: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  checkTitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  checkBtn: {
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'gray',
    marginLeft: 100,
    marginRight: 100,
  },


  titleCenter: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
