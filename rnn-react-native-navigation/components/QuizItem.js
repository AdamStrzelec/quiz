import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";

export default class QuizItem extends Component {

  changeWindowQuiz = () => {
    Navigation.setRoot({
      root: {
        component: {
          name: "Quiz",
          passProps: {
            quizId: this.props.tests.id,
          }
        }
      }
    });
  };
  
  render() {
    let tagsTab = [];
    for(let i=0; i<this.props.tests.tags.length; i++){
        tagsTab.push(
            <Text style={styles.tag}>#{this.props.tests.tags[i]} </Text>
        )
    }
    return (
      <View style={styles.quiz}>
        <TouchableOpacity onPress={this.changeWindowQuiz}>
            <View>
                <Text style={styles.title}>{this.props.tests.name}</Text>        
            </View>

            {tagsTab}

            <View>
            <Text>opis {this.props.tests.description}</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
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
    //borderWidth: 1,
    //borderColor: "black",
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    justifyContent: "center",
    marginTop: 9,
    marginBottom: 9
  },
});