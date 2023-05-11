import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, StatusBar, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default function App() {
  const [ lastNumber, setLastNumber ] = useState();
  const [ currentNumber, setCurrentNumber ] = useState('');
  const [ darkMode, setDarkMode ] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const operators = [ "AC", "+/-", "%", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "DEL", 0, ".", "=" ];

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      display: 'flex',
      backgroundColor: darkMode ? 'white' : '#22252E',
    },

    resultContainer: {
      backgroundColor: darkMode ? 'white' : '#22252E',
      flex: 2,
      maxWidth: '100%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },

    themeTouchable : {
      position: 'absolute', 
      justifyContent: "flex-end",
      alignSelf: "flex-start",
      marginLeft: 15,
      bottom: '60%',
    },
    
    theme: {
      color: darkMode ? "#000" : "#FFF",
      width: 50,
      height: 50,
      borderRadius: 40,
      textAlign: "center",
      textAlignVertical: "center"
    },

    textContainer: {
      minHeight: 105,
      justifyContent: "flex-end"
    },
  
    textHistory: {
      color: darkMode ? "#000" : "#FFF",
      fontSize: 26,
      paddingRight: 15,
      alignSelf: "flex-end",
    },
  
    textResult: {
      color: darkMode ? "#000" : "#FFF",
      fontSize: 56,
      paddingRight: 15,
      alignSelf: "flex-end",
    },
  
    operatorContainer: {
      backgroundColor: darkMode ? "#000" : "#FFF",
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 20,
      justifyContent: 'center',
      lignItems: 'flex-end',
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      backgroundColor: darkMode ? '#f6f7f9' : '#292D36'
    },
    
    operators: {
      flex: 1,
      minHeight: Dimensions.get('window').height/9.5,
      minWidth: Dimensions.get('window').width/5,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      margin: 2,
    }, 
    
    operatorsText: {
      color: darkMode ?  "#000" : "#FFF",
      fontSize: 24,
    }
  });
  

  function handleButtonPress(buttonPressed){
    if(buttonPressed == "+" || buttonPressed == "-" || buttonPressed == "*" || buttonPressed == "/"){
      
      if(currentNumber.toString().indexOf("+") == -1 && currentNumber.toString().indexOf("-") == -1 && currentNumber.toString().indexOf("*") == -1 && currentNumber.toString().indexOf("/") == -1){
        setCurrentNumber(currentNumber + " " + buttonPressed + " ");
        return;
      }else{
        const newNumberCurrent = currentNumber.toString().substring(0, currentNumber.length - 3);
        setCurrentNumber('');
        setCurrentNumber(newNumberCurrent + " " + buttonPressed + " ");
        return;
      }
    }

    setIsEmpty(false);
    switch(buttonPressed){
      case 'AC':
        setLastNumber('');
        setCurrentNumber('');
        setIsEmpty(true);
      return;
      case 'DEL':
        setCurrentNumber(currentNumber.slice(0, -1));
      return;
      case '=':
        setLastNumber(currentNumber);
        calculate()
      return;
      case '+/-':
        var change = currentNumber * -1;
        isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
      return;
      case '%':
        var change = currentNumber / 100;
        isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
      return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  function calculate(){

    const splitNumbers = currentNumber.toString().split(" ");
    const firstNumber = parseFloat(splitNumbers[0]);
    const secondNumber = parseFloat(splitNumbers[2]);
    const operation = splitNumbers[1];

    if(!isNaN(secondNumber)){
      switch(operation){
        case '+':
          var result = firstNumber + secondNumber;
          setCurrentNumber(result);
        return;
        case '-':
          var result = firstNumber - secondNumber;
          setCurrentNumber(result);
        return;
        case '*':
          var result = firstNumber * secondNumber;
          setCurrentNumber(result);
        return;
        case '/':
          var result = firstNumber / secondNumber;
          setCurrentNumber(result);
        return;
        default: 
          setLastNumber('');
          setCurrentNumber('');
        return;
      }
    }else{
      Alert.alert("Invalid format");
    }
  }

  function renderChar(char, darkMode) {
    let color = '#FFF';
    if ((typeof(char) === 'number' || (char) === '.') && darkMode) color = '#282828';
    if ((char) === '%') color = '#20d6a6';
    if ((char) === '-' || (char) === '+' || (char) === '=') color = '#FF7878';

    if ((char) === '*') {
      return (
        <Text style={[styles.textblock, {color: '#FF7878'}]}>X</Text>
      );
    }

    if ((char) === 'AC') {
      return (
        <Text style={[styles.textblock, {color: '#20d6a6', fontSize: 24}]}>{getClearLabel()}</Text>
      );
    }

    if ((char) === '/') {
      return (
        <MaterialCommunityIcons name="division" size={24} color="#FF7878"/>
      );
    }

    if ((char) === '+/-') {
      return (
        <MaterialCommunityIcons name="plus-minus" size={24} color="#20d6a6"/>
      );
    }

    if ((char) === 'DEL') {
      return (
        <MaterialCommunityIcons size={24} name="replay" color={darkMode ? '000' : '#FFF'}/>
      );
    }
    return (
      <Text style={[styles.operatorsText, { color: color, fontSize: 22 }]}>
        {char}
      </Text>
    );
  }

  const getClearLabel = () => {
    return isEmpty ? 'AC' : 'C';
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle={darkMode ? 'dark-content' : 'light-content'} />
      <View 
        style={styles.resultContainer}>
        <TouchableOpacity style={styles.themeTouchable}>
          <Feather onPress={
            () => {
              darkMode === true ? 
                setDarkMode (false) 
              :
                setDarkMode(true)
            }}
            style={styles.theme} 
            name={darkMode === true ? "moon" : "sun"} 
            size={30} 
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.textHistory}>
            {
              lastNumber
                ? lastNumber.split('').map(char =>
                    isNaN(char)
                      ? <Text style={{ color: '#FF7878' }}>{char}</Text>
                      : char
                  )
                : null
            }
          </Text>
          <Text style={styles.textResult}>
            {currentNumber}
          </Text>

        </View>
      </View>
    
      <View style={styles.operatorContainer}>
        {
          operators.map((char) => (
            <TouchableOpacity 
              key={char} 
              style={[styles.operators, {
                backgroundColor:  
                  darkMode ? '	#e7e9ef' : '#22252E'
              }]}
              onPress={() => handleButtonPress(char)}
            >
              {renderChar(char, darkMode)}
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
    );
}