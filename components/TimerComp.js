import { useState } from "react"
import { View, Pressable, Text, Flatlist, Stylesheet, Button, TextInput, StyleSheet } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer'

export const TimerComp = () => {
    const [isTimerStart, SetIsTimerStart] = useState(false);
    const [timerDuration, setTimerDuration] = useState(10000);
    const [resetTimer, setResetTimer] = useState(false);


    return(
      <View style={styles.container}>
        <Timer
          totalDuration={timerDuration}secs
          start={isTimerStart}
          reset={resetTimer}
        />

        <Pressable style={styles.buttonText} onPress={() => { SetIsTimerStart(!isTimerStart); setResetTimer(false); }}>
          <Text> {!isTimerStart ? 'START' : 'STOP'} </Text>
        </Pressable>

        <Pressable
        style={styles.buttonText}
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
  buttonText:{
    backgroundColor: "teal",
    alignContent:"center"
  }
  
})