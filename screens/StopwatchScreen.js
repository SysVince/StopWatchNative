import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Pressable, Text, Flatlist, Stylesheet, Button, TextInput, StyleSheet } from 'react-native';
import { Header } from '../components/Header';


export const StopwatchScreen = () => {
    const [isTime, setIsTime] = useState(false);
    const [time, setTime] = useState(0);
    const [lapTime, setLapTime] = useState(0);
    // const [buttonName, setButtonName] = useState("Start");
    
// Intevall kommer att kalla på en function på specifika intervall i millisekunder.
// Detta görs tills clearInterval() körs eller windows stängs
useEffect( () => {
    let interval = null;

    if (isTime){
        interval = setInterval(() => {
            setTime( prev => prev + 100);

        }, 100);
    } else {
        clearInterval(interval);
    }

    return () => clearInterval(interval)

},[isTime])


// ("0"+((time / 10) % 100)).slice(-2) slice-2 gör att det endast finns 2 chars. Utan slice får vi 2 och 3.
// Utan detta trick så printar inte den 01,02 osv. 

// {isTime && (
//     <Pressable style={styles.button} onPress={ () => {setIsTime(false); setButtonName("Resume")}}>
//         <Text>Pause</Text>
//     </Pressable>
//     )}

    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header />

            <View style={styles.timers}>
                <Text style={styles.timers}>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</Text>
                <Text style={styles.timers}>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</Text>
                <Text style={styles.timers}>{("0" + ((time / 10) % 100)).slice(-2)}</Text>
            </View>

            <View style={styles.buttonContainer}>

            <Pressable style={styles.button} onPress={ () => {}}>
                <Text>Lap</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={ () => setIsTime(true)}>
                <Text>Start</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={ () => { setTime(0); 
            // if(!isTime){
            //     setButtonName("Start")}; 
                }}>
                <Text>Reset</Text>
            </Pressable>
            
            
            <Pressable style={styles.button} onPress={ () => {setIsTime(false); 
                // setButtonName("Resume")
                }}>
                <Text>Pause</Text>
            </Pressable>
            
        

           </View>
           
            
        </View>
    )


}

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        flex: 1,
        alignItems:"center",
        

    },

    buttonContainer:{
        flexDirection: 'row'
        

    },
    button:{
        backgroundColor: "teal",
        borderRadius: 6,
        padding:5,
        margin:10,
        
        
    },
    timers:{
        flexDirection: "row",
        fontSize: 40,
    }
})