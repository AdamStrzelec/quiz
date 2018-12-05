import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class Quiz extends Component {

  state = {
    questionsCount: this.props.quiz.questions.length,
    curQuestNr: 0,
    points: 0,
    buttonTitle: 'Następne pytanie',
    answer: '',
    correctAnswer: this.props.quiz.questions.poprawna
  }
  nextQuestion = () =>{
    let questNr = this.state.curQuestNr
    questNr = questNr+1
    this.setState({curQuestNr: questNr})
  }

  checkAnswer(){

  }
  render() {
    
    let {quiz} = this.props
    return (
      <View style={styles.container}>
        <Text>Quiz Screen</Text>
        <Text>{quiz.quizNumber}</Text>
        <Text>Pytanie {this.state.curQuestNr+1} z {this.state.questionsCount}</Text>
        <Text>{quiz.questions[this.state.curQuestNr].question}</Text>
        <TouchableOpacity><Text>{quiz.questions[this.state.curQuestNr].a}</Text></TouchableOpacity>
        <TouchableOpacity><Text>{quiz.questions[this.state.curQuestNr].b}</Text></TouchableOpacity>
        <TouchableOpacity><Text>{quiz.questions[this.state.curQuestNr].c}</Text></TouchableOpacity>
        <TouchableOpacity><Text>{quiz.questions[this.state.curQuestNr].d}</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.nextQuestion}><Text>{this.state.buttonTitle}</Text></TouchableOpacity>
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