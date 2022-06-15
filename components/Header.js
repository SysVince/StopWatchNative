import {Text, StyleSheet, View} from 'react-native'

export const Header = () =>{

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stopwatch Timer App 3000!</Text>
        </View>
    )
   
}

const styles = StyleSheet.create({
    title: {
        marginVertical: 50,
        fontSize: 30,
        alignItems: "center",
        color: "#fff"
    }, container: {
        alignItems: "center",
        
    },
});