import * as SQLite from "expo-sqlite"

//Skapar en databas todo.db om det inte finns.
const db = SQLite.openDatabase("stopwatch.db");

export const initDB = () => {

    return new Promise ( (resolve , reject) => {

    db.transaction( (transaction) => {
        transaction.executeSql(`CREATE TABLE IF NOT EXISTS stopwatch (
            id INTEGER PRIMARY KEY NOT NULL,
            laptime TEXT NOT NULL
        )`, [] ,
        (transx, res) => resolve(res),
        (transx, err) => reject(err)
        )
    })    
        
})
} 


export const findAll = () => {
    return new Promise ( (resolve, reject) => {

        db.transaction( (transaction) => {
            transaction.executeSql(`SELECT * FROM stopwatch`, [],
            (transx, res) => resolve(res.rows._array),
                (transx, err) => reject(err)
            )
        })
    })
}




export const insert = (strLapTime) => {
    return new Promise( (resolve, reject) => {

        db.transaction( (transaction) => {
            transaction.executeSql(`INSERT INTO stopwatch (laptime)
            VALUES (?)`, [strLapTime],
            (transx, res) => resolve(res),
            (transx, err) => reject(err)
            )
        })
    })
}


export const clearLapTimeTable = () => {
    return new Promise( (resolve, reject) => {

        db.transaction( (transaction) => {
            transaction.executeSql(`DELETE FROM stopwatch`, [],
            (transx, res) => resolve(res),
            (transx, err) => reject(err)
            )
        })
    })
}