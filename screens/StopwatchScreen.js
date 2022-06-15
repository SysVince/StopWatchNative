import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Header } from "../components/Header";
import { Stopwatch } from "../components/Stopwatch";
import { clearLaptimeTable, findAll, insert } from "../database/localdb";

export const StopwatchScreen = ({ dbInitialized }) => {
  const [lapTime, setLapTime] = useState([]);

  useEffect(() => {
    findAll().then((res) => setLapTime(res));
  }, [dbInitialized]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background2.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <StatusBar style="auto" />

        <View style={styles.container}>
          <Header />
          <Stopwatch lapTime={lapTime} setLapTime={setLapTime} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
