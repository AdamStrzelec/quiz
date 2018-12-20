/** @format */

import { Navigation } from "react-native-navigation";
import App from "./App";
import Drawer from "./Drawer";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import Result from "./Result";
import { Dimensions } from "react-native";

Navigation.registerComponent(`Home`, () => App);
Navigation.registerComponent(`Drawer`, () => Drawer);
Navigation.registerComponent(`Quiz`, () => Quiz);
Navigation.registerComponent(`Results`, () => Results);
Navigation.registerComponent(`Result`, () => Result);


/*
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Home"
      }
    }
  });
});
*/
const { width } = Dimensions.get("window");
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 0,
      visible: false,
      drawBehind: true,
      animate: false,
      buttonColor: "white",
      title: {
        color: "white",
        alignment: "center"
      },
      background: {
        color: "transparent"
      }
    }
  });
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: "drawerId",
            name: "Drawer",
            fixedWidth: width
          }
        },
        center: {
          stack: {
            id: "MAIN_STACK",
            children: [
              {
                component: {
                  name: "Home"
                }               
              }             
            ]            
          }
        }
      }
    }
  });
});
