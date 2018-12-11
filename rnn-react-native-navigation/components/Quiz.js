import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class Quiz extends Component {

  state = {
    questionsCount: 0,
    curQuestNr: 0,
    points: 0,
    buttonTitle: 'Następne pytanie',
    name: '',
    description: '',
    level: '',
    tasks: [],
    tags: [],
    id: this.props.quizId,
    question: [],
    duration: 0,
    dur: 33,
    answers: [],
    answer1: [],
    answer2: [],
    answer3: [],
    answer4: [],
    test: null,
    tableOfTasks: [],
    answered: false
    
  }

  
  nextQuestion = () =>{
    let durat = this.state.dur
    let questNr = this.state.curQuestNr
    questNr = questNr+1
    this.setState({curQuestNr: questNr, answered: false, duration: durat})
    console.log(this.state.dur + " " + this.state.duration)
  }
  
 
 componentDidMount(){
  return fetch('https://pwsz-quiz-api.herokuapp.com/api/test/'+this.state.id)
  .then(response => response.json())
  .then(json => { 
    this.setState(
      {
      questionsCount: json.tasks.length,
      test: json,
      duration: json.tasks[0].duration,
      dur: json.tasks[0].duration
      }
    )
    let tempTabOfTasks = []
    let tempTabOfAnswers = []
    for(let i=0; i<json.tasks.length; i++){    
      for(let j=0; j<json.tasks[i].answers.length; j++){
        tempTabOfAnswers.push(
          <View>
            <TouchableOpacity
              onPress={this.checkAnswer.bind(this, json.tasks[i].answers[j].isCorrect)}>
              <Text>{json.tasks[i].answers[j].content}</Text>
            </TouchableOpacity>
          </View>
        )
      }
      tempTabOfTasks.push(
        <View>
          <Text>{json.tasks[i].question}</Text>
          {tempTabOfAnswers}
        </View>
      )
      tempTabOfAnswers = []
    }
    this.setState({tableOfTasks: tempTabOfTasks})
    
    if(this.state.test instanceof Object){
      this.timeout = setInterval(() => {
        let currentIdx = this.state.duration;
        let answered = this.state.answered
        if(answered==false){this.setState({ duration: currentIdx - 1 })}
        if(currentIdx==0){this.nextQuestion()}
      }, 1000);
    }
    /*
    //console.log(json.tasks.length)
    console.log(json.tasks[0].answers[0].content)
    
    let questions = []
    let answer1 = []
    let answer2 = []
    let answer3 = []
    let answer4 = []
    let answers
    for(let i=0; i<json.tasks.length; i++)
    {
      questions.push(json.tasks[i].question)
      
      answer1.push(json.tasks[i].answers[0].content)
      answer2.push(json.tasks[i].answers[1].content)
      answer3.push(json.tasks[i].answers[2].content)
      answer4.push(json.tasks[i].answers[3].content)
      
    }

    //console.log(questions[0])
    //console.log(answers[0])
    this.setState({
      question: questions, answers: answers,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4
      
    });
    console.log(this.state.answers[0])
*/
  })
  
 }

 componentDidUnmount() {
  clearInterval(this.timeout);
}

  checkAnswer = isCorrect => {
    let points = this.state.points
    isCorrect ? points = points+1 : points
    this.setState({answered: true, points: points})
    console.log("answer is: " + isCorrect + " " + points)
    
  }


  render() {

    return this.state.test instanceof Object ?(
      
      <View style={styles.container}>
        <Text>{this.state.name}</Text>
        <Text>{this.state.test.description}</Text>
        <Text>{this.state.test.tasks[this.state.curQuestNr].question}</Text>
        <Text>{this.state.questionsCount}</Text>
        {this.state.tableOfTasks[this.state.curQuestNr]}
        <TouchableOpacity onPress={this.nextQuestion}><Text>{this.state.buttonTitle}</Text></TouchableOpacity>
        <Text>{this.state.duration}</Text>
      </View>
    ) : <Text>Fetching, Please wait....</Text>;
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
/*
        <Text>{quiz.quizNumber}</Text>
        <Text>Pytanie {this.state.curQuestNr+1} z {this.state.questionsCount}</Text>
        <Text>{quiz.questions[this.state.curQuestNr].question}</Text>
        <TouchableOpacity><Text>{quiz.questions[this.state.curQuestNr].a}</Text></TouchableOpacity>
        <TouchableOpacity><Text>{quiz.questions[this.state.curQuestNr].b}</Text></TouchableOpacity>
        <TouchableOpacity><Text>{quiz.questions[this.state.curQuestNr].c}</Text></TouchableOpacity>
        <TouchableOpacity><Text>{quiz.questions[this.state.curQuestNr].d}</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.nextQuestion}><Text>{this.state.buttonTitle}</Text></TouchableOpacity>


*/