import { useState } from "react";
import {
  View,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { Timer } from "react-native-stopwatch-timer";

export const TimerComp = () => {
  const [isTimerStart, SetIsTimerStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(50000);
  const [resetTimer, setResetTimer] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");

  const setTimer = () => {

    SetIsTimerStart(false);
    setResetTimer(true);
    if (textInputValue.length === 0 || !parseInt(textInputValue)) {
      setTimerDuration(0);
    } else {
      setTimerDuration(parseInt(textInputValue));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={setTextInputValue}
          value={textInputValue}
          placeholder={"Time in milliseconds"}
          maxLength={9}
        />

        <Pressable style={styles.button} onPress={setTimer}>
          <Text style={styles.buttonText}>Set Timer</Text>
        </Pressable>
      </View>

      <View style={styles.timers}>
        <Timer
          totalDuration={timerDuration}
          msecs
          start={isTimerStart}
          reset={resetTimer}
        />
      </View>

      <View style={styles.inputContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            SetIsTimerStart(!isTimerStart);
            setResetTimer(false);
          }}
        >
          <Text style={styles.buttonText}>
            {" "}
            {!isTimerStart ? "START" : "STOP"}{" "}
          </Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            SetIsTimerStart(false);
            setResetTimer(true);
          }}
        >
          <Text style={styles.buttonText}>RESET</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
  },
  timers: {
    marginTop: 50,
    marginBottom: 10,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "teal",
    borderRadius: 6,
    padding: 6,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: "grey",
    width: "40%",
    padding: 10,
    margin: 10,
  },
});
