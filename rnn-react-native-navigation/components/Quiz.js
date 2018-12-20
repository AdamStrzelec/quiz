import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Navigation } from "react-native-navigation";
//import QuizAnswer from '.QuizAnswer';

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
    answered: false,
    tableRefreshed: [],
    correctAnswer: '',
    correctNumber: 0,
    
  }

  sendResult = () => {
    fetch('https://pwsz-quiz-api.herokuapp.com/api/result', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nick: 'bez nazwyy',
        score: this.state.points+'',
        total: this.state.questionsCount+'',
        type: this.props.name,
        date: '2018-12-19'
      })
    }

    );
  }

  nextQuestion = () =>{
    let duration = this.state.test.tasks[this.state.curQuestNr+1].duration
    let questNr = this.state.curQuestNr
    

    if(questNr+1==this.state.questionsCount-1){
      
      this.sendResult()

      Navigation.setRoot({
        root: {
          component: {
            name: "Result",
            passProps: {
              points: this.state.points,
              questCount: this.state.questionsCount
              
            }
          }
        }
      });
    }
    
    if(questNr<this.state.questionsCount-1){
      
      questNr = questNr+1
      console.log(questNr + " quest zount " + this.state.questionsCount)
      this.setState({curQuestNr: questNr, answered: false, duration: duration, correctAnswer: ''})
    }
  
    //this.setState({curQuestNr: questNr, answered: false, duration: duration, correctAnswer: ''})
    //console.log(this.state.dur + " " + this.state.duration)
    if(questNr+1==this.state.questionsCount){
      console.log('to juz jest koniec')
      this.setState({buttonTitle: 'Zakończ quiz'})
    }
  }
  
 
 async componentDidMount(){
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
    let ans = ['a) ', 'b) ', 'c) ', 'd) ', 'e) ', 'f) ', 'g) ']
    let tempTabOfTasks = []
    let tempTabOfAnswers = []

    for(let i=0; i<json.tasks.length; i++){    
      for(let j=0; j<json.tasks[i].answers.length; j++){

        tempTabOfAnswers.push(
          //<View>
            <TouchableOpacity  
              onPress={this.checkAnswer.bind(this, json.tasks[i].answers[j].isCorrect)
              }>
                <Text style={this.buttonStyle(json.tasks[i].answers[j].isCorrect)}>
                  {j+1}) {json.tasks[i].answers[j].content}
                </Text>
            </TouchableOpacity>
          //</View>
        )
        
        if(json.tasks[i].answers[j].isCorrect){
          this.setState({correctNumber: j})
          console.log('poprawna odp: ' + this.state.correctNumber)
        }
        
      }
      tempTabOfTasks.push(
        <View>
          <Text style={styles.question}>{json.tasks[i].question}</Text>
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

  })
  
 }

 componentDidUnmount() {
  clearInterval(this.timeout);
}

  checkAnswer = (isCorrect, number) => {
    let points = this.state.points
    isCorrect ? points = points+1 : points
    this.setState({answered: true, points: points, correctAnswer: 'poprawna odpowiedź to: '+ this.state.correctNumber})
    console.log("answer is: " + isCorrect + " " + points)
    
  }



  render() {
    console.log('nazwa: ' + this.props.name)
    let tempTabOfTasks = []
    let tempTabOfAnswers = []
    if(this.state.test instanceof Object){
    let test = this.state
    for(let i=0; i<test.tasks.length; i++){    
      for(let j=0; j<test.tasks[i].answers.length; j++){
        tempTabOfAnswers.push(
          //<View>
            <TouchableOpacity  
              onPress={this.checkAnswer.bind(this, test.tasks[i].answers[j].isCorrect, j)
              }>
                <Text style={this.buttonStyle(test.tasks[i].answers[j].isCorrect)}>
                  {test.tasks[i].answers[j].content}
                </Text>
            </TouchableOpacity>
          //</View>
        )
      }
      tempTabOfTasks.push(
        <View>
          <Text style={styles.question}>{test.tasks[i].question}</Text>
          {tempTabOfAnswers}
        </View>
      )
      tempTabOfAnswers = []
    }
    //console.log(tempTabOfAnswers[0])
  }
    //{this.state.tableOfTasks[this.state.curQuestNr]}
    //{tempTabOfTasks[this.state.curQuestNr]}
    return this.state.test instanceof Object ?(
      
      <View style={styles.container}>
        <Text style={styles.name}>{this.state.test.name}</Text>
        <Text style={styles.questNr}>Pytanie {this.state.curQuestNr + 1} z {this.state.questionsCount}</Text>
        <Text style={styles.points}>Zdobytych punktów: {this.state.points}</Text>
        <View style={styles.answers}>

          {this.state.tableOfTasks[this.state.curQuestNr]}

          
        </View>
        <Text>{this.state.correctAnswer}</Text>
        <Text style={styles.duration}>Czas na odpowiedź: {this.state.duration}</Text>
        <TouchableOpacity 
          onPress={this.nextQuestion}>
          <Text style={styles.nextQuest}>{this.state.buttonTitle}</Text>
        </TouchableOpacity>
        
      </View>
    ) : <Text>Fetching, Please wait....</Text>;
  }
  buttonStyle = function(isCorrect){
    let answered = this.state.answered
    console.log("isCorrect: " + answered)
    
    let background = 'gray'
    //isCorrect==true ? background='green' : background='gray'
    return {
      textAlign: 'center',
      borderRadius: 15,
      fontSize: 14,
      fontWeight: '500',
      color: 'white',
      backgroundColor: background,
      paddingTop: 2,
      paddingBottom: 3,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 5,
      width: 400,
      height: 43
    }
  }

  buttonStyleAns = function(isCorrect){
    let answered = this.state.answered
    console.log("isCorrect: " + answered)
    
    let background = 'gray'
    isCorrect==true ? background='green' : background='gray'
    return {
      textAlign: 'center',
      borderRadius: 15,
      fontSize: 14,
      fontWeight: '500',
      color: 'white',
      backgroundColor: background,
      paddingTop: 2,
      paddingBottom: 3,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 5,
      width: 400,
      height: 43
    }
  }

}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
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
  name: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
    marginBottom: 7
  },
  question: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    height: 120,
    marginLeft: 15,
    marginRight: 15
  },
  questNr: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10
  },
  ansBut: {
    textAlign: 'center',
    borderRadius: 15,
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'gray',
    paddingTop: 2,
    paddingBottom: 3,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    width: 400,
    height: 43
  },


  duration: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '500',
    color: 'brown',
    marginTop: 5,
    marginBottom: 5
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
  points: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'blue'
  },
  answers: {
    height: 400
  }

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