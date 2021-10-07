let SQLite = require('sqlite3').verbose()
let dbSource = "D:\\Programing\\SQLLite\\sqlitedb.db"

let db = new SQLite.Database(dbSource, (error) => {
    if (error) {
        console.error(error.message)
        console.log("Cannot find specified Database.")
        throw error
    } else {
        console.log('Connected to Database.')
        db.run(`CREATE TABLE Grisar (
            grisId INTEGER PRIMARY KEY,
            grisNamn TEXT,
            grisSort TEXT,
            grisLand TEXT,
            grisPris REAL
            )`, (err) => {
            if (err) {
                console.log("Could not create Table. Table already exists in database.")
            } else {

                let insert = 'INSERT INTO Grisar (grisNamn, grisSort, grisLand, grisPris) VALUES (?,?,?,?)'
                db.run(insert, ["Gösta", "Afrikansk Skinkgris", "Mozambique", 6000])
                db.run(insert, ["Nils", "Svensk Ostgris", "Sverige", 1000])
                db.run(insert, ["Muffe", "Siberisk Kaffegris", "Tyskland", 6000])
            }
        })
    }
})

module.exports = db