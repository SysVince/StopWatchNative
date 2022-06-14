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
            (transx, res) => {
                let temp = [];
                for (let i = 0; i< res.rows.length; i++){
                    temp.push(res.rows.item(i));
                    console.log(temp);
                }
            },
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