import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("Dragosz_Jakub_4i11.db");
class Database extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    static createTable() {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alarms (id integer primary key not null, time text, weekDays text);"
            );
        });
    }
    static addAlarm(hour, weekDays) {
        console.log(hour, weekDays);
        db.transaction(
            tx => {
                tx.executeSql(`INSERT INTO alarms (time, weekDays) values ('${hour}', '${weekDays}')`)
            },
        )
    }
    static async getAllAlarms() {
        var query = "SELECT * FROM alarms";
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                console.log(results.rows._array)
                resolve(results.rows._array);
            }, function (tx, error) {
                reject(error);
            });
        }))
    }
    static remove(id) {
        console.log(id);
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM alarms WHERE (id = '${id}')`
            );
        });
    }
    static update(id, days) {

    }
}
export { Database };