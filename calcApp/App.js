import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Keyboard } from "./components/keyboard";
import { Screen } from './components/screen';
import { Dimensions } from 'react-native';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      wynik: "",
      obliczenia: "",
      orientation: this.isPortrait()
    }
    this.symbols = ['*', '/', '-', '+']
    this.add = this.add.bind(this);
    this.isPortrait = this.isPortrait.bind(this);
  }
  add(str) {
    switch (str) {
      case "Del":
        console.log('del: ');
        console.log(this.state.obliczenia);
        let obl = this.state.obliczenia.toString();
        let obliczenia = obl.slice(0, -1);
        this.setState({
          obliczenia: obliczenia,
          wynik: ''
        });
        break;
      case "Sqrt":
        let obliczenia1 = Math.sqrt(this.state.obliczenia);
        this.setState({
          obliczenia: obliczenia1,
          wynik: obliczenia1
        });
        break;
      case "Pow":
        let obliczenia2 = Math.pow(this.state.obliczenia, 2);
        this.setState({
          obliczenia: obliczenia2,
          wynik: obliczenia2
        });
        break;
      case "Sin":
        let obliczenia3 = Math.sin(this.state.obliczenia);
        this.setState({
          obliczenia: obliczenia3,
          wynik: obliczenia3
        });
        break;
      case "Cos":
        let obliczenia4 = Math.cos(this.state.obliczenia);
        this.setState({
          obliczenia: obliczenia4,
          wynik: obliczenia4
        });
        break;
      case "C":
        this.setState({
          obliczenia: "",
          wynik: ""
        });
        break;
      case "=":
        this.setState({
          obliczenia: eval(this.state.obliczenia),
          wynik: eval(this.state.obliczenia)
        })
        break;
      case '-':
      case '+':
      case '/':
      case '*':
        obliczenia = this.state.obliczenia;
        console.log("aaa: ");
        console.log(obliczenia[obliczenia.length - 1]);
        console.log(this.symbols.includes(obliczenia[obliczenia.length - 1]));
        if (this.symbols.includes(obliczenia[obliczenia.length - 1])) {
          obliczenia = obliczenia.slice(0, -1);
        }
        if (obliczenia.length !== 0 || str === '-') {
          let obl = obliczenia + str;
          this.setState({
            obliczenia: obl
          });
        }
        break;
      default:
        obliczenia = this.state.obliczenia + str;
        this.setState({
          obliczenia: obliczenia
        });
        break;
    }
    console.log(this.state.obliczenia);
  }
  isPortrait = () => {
    let dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };
  wynik() {

  }
  render() {
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: this.isPortrait()
      });
      console.log("aaa");
    })
    console.log(this.state.orientation);
    if (this.state.orientation) {
      return (
        <View style={styles.container}>
          <Screen wynik={this.state.wynik} obliczenia={this.state.obliczenia} />
          <Keyboard add={this.add} isPortrait={this.state.orientation} />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Screen wynik={this.state.wynik} obliczenia={this.state.obliczenia} />
          <Keyboard add={this.add} isPortrait={this.state.orientation} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
