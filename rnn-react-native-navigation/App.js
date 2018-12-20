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
  TouchableHighlight,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Modal
  
  
} from "react-native";
import { Navigation } from "react-native-navigation";
import QuizOption from "./components/QuizItemOption";
import QuizItemOption from "./components/QuizItemOption";
import QuizItem from "./components/QuizItem";
import SQLite from 'react-native-sqlite-storage';
import { FIRST_OPEN } from './components/config';

//import FtreScreen from './components/FtueScreen';

//var DB
//const getDB = () => DB ? DB : DB = SQLite.openDatabase({name: 'tests.db', createFromLocation: 1})

export default class App extends Component {

  constructor(props){
    super(props)

}


  state = {
    napis: "example text",
    quiz: [],
    nrOfQuiz: 0,
    tests: [],
    firstLaunch: null,
    modalVisible: false,
  };



  async componentDidMount(){
    return fetch('https://pwsz-quiz-api.herokuapp.com/api/tests')
      .then(response => response.json())
      .then(json => {
        this.setState({tests: json})

        this._retrieveData()

      })
  }

  setModalVisible(visible){
    this.setState({modalVisible: visible})
  }

  _retrieveData = async () => {

    
    try {
      let value = await AsyncStorage.getItem('log7');
      if (value !== null) {
        console.log("zalogowano po arz koejny: " + value);
      }
      else{
        console.log("zalogowano po raz pierszy " + value);
        await AsyncStorage.setItem('log7', 'launched')
        this.setState({modalVisible: true});
      }
     } catch (error) {
       
       alert(error);
     }
     
  }


  getAllTests(DB) {
    const query = 'SELECT * FROM tests;';
    return DB.executeSql(query).then(([results]) => {
      return JSON.parse(results.rows.item(0).data || '{}');
    });
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
    if(this.state.tests instanceof Object){
    for(let i=0; i<this.state.tests.length; i++){
      
      testsTab.push(
        
        <View style={styles.quiz}>
          <QuizItem tests={this.state.tests[i]}/>
        </View>

      );
    }
      
      console.log("dlugosc to: " + this.state.tests.length)
    }
    //console.log("dlugosc to: " + this.state.tests[1])
    //console.log(FIRST_OPEN);
    return this.state.tests instanceof Object ? (
      <View>


<Modal
          animationType={"slide"}
          transparent={true}
          style={styles.ftreContainer}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={styles.ftreContainer}>
            <View style={styles.ftreTitleContainer}>
              <Text style={styles.ftreTitle}>Witaj w aplikacji Quiz</Text>
            </View>
            <View style={styles.ftreDescriptionContainer}>
              <Text style={styles.ftreDescription} allowFontScaling={true}>
                Odpowiadaj na pytania i zbierz największą ilość punktów
              </Text>
              <Text></Text>
              <Text style={styles.ftreDescription} allowFontScaling={true}>
                Baw się dobrze
              </Text>
            </View>
            <View style={styles.ftreExitContainer}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View style={styles.ftreExitButtonContainer}>
                  <Text style={styles.ftreExitButtonText}>OK</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>


        <ScrollView>{testsTab}
        <View style={styles.check}>
          <Text style={styles.checkTitle}>Get to Know your rank result</Text>
          <TouchableOpacity onPress={this.changeWindowResults}>
            <Text style={styles.checkBtn}>Check!</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    ) : <View><Text>asdsad</Text></View>;
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
  },
  ftreContainer:{
		backgroundColor:'black',
		flex:1,
		marginTop:70,
		marginBottom:40,
		marginLeft:20,
		marginRight:20,
		borderRadius:20,
		borderWidth:4,
		borderColor:'red'
	},
	ftreTitle:{
		color:'white',
        fontWeight:'bold',
		fontSize:20,
		textAlign:'center',
		margin:10,	
	},
	ftreDescription:{
		color:'white',
        fontSize:15,
		marginRight:20,
		marginLeft:20
	},
	ftreCloseIcon:{
		alignSelf:'flex-end',
		flex:0.5,
		marginRight:10
	},
	ftreTitleContainer:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	ftreDescriptionContainer:{
		flex:6.5
	},
	ftreExitContainer:{
		flex:2,
		justifyContent:'flex-start',
		alignItems:'center',
	},
	ftreExitButtonContainer:{
		width:200,
		height:40,
		backgroundColor:'red',
		borderRadius:10,
		justifyContent:'center',
	},
	ftreExitButtonText:{
		color:'white',
		fontSize:20,
		fontWeight:'bold',
		textAlign:'center'
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