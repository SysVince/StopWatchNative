import { useState, useEffect } from "react";
import {
  View,
  Pressable,
  Text,
  FlatList,
  Stylesheet,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { clearLapTimeTable, findAll, insert } from "../database/localdb";

export const Stopwatch = ({ lapTime, setLapTime }) => {
  const [isTime, setIsTime] = useState(false);
  const [time, setTime] = useState(0);

  const [buttonName, setButtonName] = useState("Start");

  // .slice-2 gör att vi endast visar 2 character. så det visar 00:00:01 istället för 00:00:1
  let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
  let seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
  let milliseconds = ("0" + ((time / 10) % 100)).slice(-2);

  // En bättre lösning är Date() å jämföra med två olika Date()
  useEffect(() => {
    let interval = null;

    if (isTime) {
      interval = setInterval(() => {
        setTime((prev) => prev + 100);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTime]);

  // Första .then är res från insert(), andra är från findAll()
  const saveLapTime = () => {
    insert(`${minutes}:${seconds}:${milliseconds}`)
      .then(() => findAll())
      .then((res) => setLapTime(res));
  };
  // Första .then är res från deleteAll(), andra är från findAll()
  const deleteLapTime = () => {
    clearLapTimeTable()
      .then((res) => {
        console.log(res);
        return findAll();
      })
      .then((res) => setLapTime(res));
  };

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.renderItem}>
        <Text style={styles.renderText}>
          Lap{item.id} - {item.laptime}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.timersContainer}>
        <Text style={styles.timers}>{minutes}:</Text>
        <Text style={styles.timers}>{seconds}:</Text>
        <Text style={styles.timers}>{milliseconds}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={saveLapTime}>
          <Text>Lap</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => setIsTime(true)}>
          <Text style={styles.buttonText}>{buttonName}</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            setTime(0);
            if (!isTime) {
              setButtonName("Start");
            }
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            setIsTime(false);
            setButtonName("Resume");
          }}
        >
          <Text style={styles.buttonText}>Pause</Text>
        </Pressable>
      </View>

      {lapTime.length >= 1 && (
        <Pressable style={styles.button} onPress={deleteLapTime}>
          <Text style={styles.buttonText}>Clear All Laptimes</Text>
        </Pressable>
      )}

      <FlatList
        data={lapTime}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "teal",
    borderRadius: 6,
    padding: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 15,
  },
  timersContainer: {
    flexDirection: "row",
  },
  timers: {
    fontSize: 60,
  },

  renderItem: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 5,
    borderRadius: 6,
  },
  renderText: {
    fontSize: 15,
  },
});
