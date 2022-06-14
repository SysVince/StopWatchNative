import { View, StyleSheet, ImageBackground } from "react-native"
import { Header } from "../components/Header"
import { TimerComp } from "../components/TimerComp"

export const TimerScreen = () => {


    return(
        <View style={styles.container}>
            <ImageBackground 
        source={require("../assets/backgroundwater.jpg")}
         resizeMode='cover' 
         style={styles.backgroundImage}>
            <TimerComp />
            </ImageBackground>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    backgroundImage:{
        height:"100%",
        width:"100%",
    }
})