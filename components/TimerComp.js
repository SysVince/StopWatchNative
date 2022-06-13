import { useState } from "react"
import { View, Pressable, Text, Flatlist, Stylesheet, Button, TextInput, StyleSheet } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer'

export const TimerComp = () => {
    const [isTimerStart, SetIsTimerStart] = useState(false);
    const [timerDuration, setTimerDuration] = useState(50000);
    const [resetTimer, setResetTimer] = useState(false);
    const [textInputValue, setTextInputValue] = useState(55);

    let myNumber = textInputValue;


    const handleTextInput = (value) => {
      setTextInputValue(value);
    }
    
    const setTimer = () => {
      
      // SetIsTimerStart(false);
      // setResetTimer(true);
      setTimerDuration(myNumber);


    }


    return(
      <View style={styles.container}>
        <TextInput style={styles.textInput} onChangeText={handleTextInput} value={textInputValue} keyboardType="numeric" />
        
        <Pressable style={styles.button} onPress={setTimer}>
          <Text>Set Timer</Text>
        </Pressable>

        <Timer
          totalDuration={timerDuration}msecs
          start={isTimerStart}
          reset={resetTimer}
        />

        <Pressable style={styles.button} onPress={() => { SetIsTimerStart(!isTimerStart); setResetTimer(false); }}>
          <Text> {!isTimerStart ? 'START' : 'STOP'} </Text>
        </Pressable>

        <Pressable
        style={styles.button}
          onPress={() => {
            SetIsTimerStart(false);
            setResetTimer(true);
          }}>
          <Text>RESET</Text>
        </Pressable>
      </View>
    )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    marginTop:50,

  },
  button:{
    backgroundColor: "teal",
    alignContent:"center",
    fontSize:50,
    margin:10,
    padding: 10,


  },
  textInput:{
    backgroundColor:"grey",
    width: "40%",
    padding:10,
    margin:10,
  }

  
})