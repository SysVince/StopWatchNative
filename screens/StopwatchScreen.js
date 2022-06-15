import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Pressable, Text, FlatList, Stylesheet, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Header } from '../components/Header';
import { clearLaptimeTable, findAll, insert } from '../database/localdb';
// import { findAll } from '../database/localDb';


export const StopwatchScreen = ( {dbInitialized} ) => {
    const [isTime, setIsTime] = useState(false);
    const [time, setTime] = useState(0);
    const [lapTime, setLapTime] = useState([]);
    const [buttonName, setButtonName] = useState("Start");


    // .slice-2 gör att vi endast visar 2 character. så det visar 00:00:01 istället för 00:00:1
    let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    let seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    let milliseconds = ("0" + ((time / 10) % 100)).slice(-2);

// En bättre lösning är Date() å jämföra med två olika Date()
    
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

useEffect( () => {
    findAll()
    .then(res => setLapTime(res))
}, [dbInitialized])

// Första .then e res från insert(), andra är från findAll()
const saveLapTime = () => {
    insert(`${minutes}:${seconds}:${milliseconds}`)
    .then( () =>  findAll())
    .then(res => setLapTime(res))
}
// Första .then e res från deleteAll(), andra är från findAll()
const deleteLapTime = () => {
    clearLaptimeTable()
    .then(res => {
        console.log(res);
        return findAll();
    })
    .then(res => setLapTime(res))
}

const _renderItem = ({item}) => {
    return(
        <View style={styles.renderItem}>
            <Text>Lap{item.id} - {item.laptime}</Text>
        </View>
    )
}





// ("0"+((time / 10) % 100)).slice(-2) slice-2 gör att det endast finns 2 chars. Utan slice får vi 2 och 3.
// Utan detta trick så printar inte den 01,02 osv. 

// {isTime && (
//     <Pressable style={styles.button} onPress={ () => {setIsTime(false); setButtonName("Resume")}}>
//         <Text>Pause</Text>
//     </Pressable>
//     )} 

    return(
        <View style={styles.container}>
            <ImageBackground source={require("../assets/background2.jpg")}
            resizeMode="cover"
            style={styles.backgroundImage}>
                {/* <StatusBar translucent backgroundColor='transparent' /> */}
                <StatusBar style="auto" />

                <View style={styles.container}>
                
            
            
           
            <Header />
            

            <View style={styles.timers}>
                <Text style={styles.timers}>{minutes}:</Text>
                <Text style={styles.timers}>{seconds}:</Text>
                <Text style={styles.timers}>{milliseconds}</Text>
            </View>

            <View style={styles.buttonContainer}>

            <Pressable style={styles.button} onPress={saveLapTime}>
                <Text>Lap</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={ () => setIsTime(true)}>
                <Text>{buttonName}</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={ () => { setTime(0); 
            if(!isTime){
                setButtonName("Start")
            }; 
                }}>
                <Text>Reset</Text>
            </Pressable>
            
            
            <Pressable style={styles.button} onPress={ () => {setIsTime(false); 
                setButtonName("Resume")
                }}>
                <Text>Pause</Text>
            </Pressable>
            
           </View>

           <Pressable style={styles.button} onPress={deleteLapTime}>
                <Text>Clear All Laptimes</Text>
            </Pressable>
 
        <FlatList 
        data={lapTime} 
        renderItem={_renderItem} 
       keyExtractor={ (item, index) => index} 
        />  
    
           
           </View>
           </ImageBackground>
        </View>
    )


}

const styles = StyleSheet.create({
    container:{
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
    },
    backgroundImage:{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height

    },
    renderItem:{
        backgroundColor: "lightblue",
        padding: 10,
        margin:5,
        borderRadius:6
    },
})