/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { Navigation } from "react-native-navigation";
import QuizOption from "./components/QuizItemOption";
import QuizItemOption from "./components/QuizItemOption";
import QuizItem from "./components/QuizItem";

export default class App extends Component {
  state = {
    napis: "example text",
    quiz: [],
    nrOfQuiz: 0,
    tests: []
  };

  componentDidMount(){
    return fetch('https://pwsz-quiz-api.herokuapp.com/api/tests')
      .then(response => response.json())
      .then(json => this.setState({tests: json}))
  }

  changeWindowResults = () => {
    Navigation.setRoot({
      root: {
        component: {
          name: "Results",
          passProps: {
            napis: 'quiz'
          }
        }
      }
    });
  };

  render() {
    
    let quiz = [
      {
        id: 1,
        quizNumber: "test #1",
        quizDescription: "sadsadadssadsad",
        quizContent: "zawartosc quiz 1",
        questions: [
          {question: '2+2=...', a:'1',b:'2',c:'3',d:'4',poprawna:'4'},
          {question: '2+8=...', a:'10',b:'2',c:'3',d:'4',poprawna:'10'}
        ]
      },
      {
        id: 2,
        quizNumber: "test #2",
        quizDescription: "sadsadadssadsad",
        quizContent: "zawartosc quiz 2",
        questions: [
          {question: '2+2=...', a:'1',b:'2',c:'3',d:'4',poprawna:'4'},
          {question: '2+2=...', a:'1',b:'2',c:'3',d:'4',poprawna:'4'}
        ]
      },
      {
        id: 3,
        quizNumber: "test #3",
        quizDescription: "sadsadadssadsad",
        quizContent: "zawartosc quiz 3",
        questions: [
          {question: '2+2=...', a:'1',b:'2',c:'3',d:'4',poprawna:'4'},
          {question: '2+2=...', a:'1',b:'2',c:'3',d:'4',poprawna:'4'}
        ]
      }
    ];
    
    

    let quizes = [];
    for (let i = 0; i < quiz.length; i++) {
      quizes.push(
        <View style={styles.quiz}>
          <QuizItemOption quizy={quiz[i]}/>
        </View>
      );
    }

    //
    console.log("testsTable: " + this.state.tests.length)

    let testsTab = [];
    for(let i=0; i<this.state.tests.length; i++){
      
      testsTab.push(
        
        <View style={styles.quiz}>
          <QuizItem tests={this.state.tests[i]}/>
        </View>

      );
      
      console.log("dlugosc to: " + this.state.tests.length)
    }
    //console.log("dlugosc to: " + this.state.tests[1])
    return (
      <View>
        
        <ScrollView>{testsTab}
        <View style={styles.check}>
          <Text style={styles.checkTitle}>Get to Know your rank result</Text>
          <TouchableOpacity onPress={this.changeWindowResults}>
            <Text style={styles.checkBtn}>Check!</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    justifyContent: "center",
    marginTop: 9,
    marginBottom: 9
  },
  tag: {
    marginBottom: 9,
    color: "blue",
    fontSize: 15
  },
  quiz: {
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 7,
    marginRight: 7,
    borderWidth: 1,
    borderColor: "black",
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  check: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "black"
  },
  checkTitle: {
    fontSize: 20,
    textAlign: "center"
  },
  checkBtn: {
    textAlign: "center",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "gray",
    marginLeft: 100,
    marginRight: 100
  },

  titleCenter: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  }
});
/*
          <View>
            <TouchableOpacity
              onPress={this.changeWindowQuiz.bind(this, quiz[i].quizTable)}
            >
              <Text style={styles.title}>Title {quiz[i].quizNumber}</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.tag}>Tag#1 Tag#2</Text>
          </View>

          <View>
            <Text>{quiz[i].quizDescription}</Text>
          </View>
*/