let express = require("express")
let app = express()
let cors = require('cors')
let db = require("/Programing/WebStorm/Projects/nodepracticewithdb/database.js")

app.use(cors())
app.use(express.static('public'))
let bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let port = 3030;

app.listen(port, () => {
    console.log("Server running on port: " + port)
});


app.get("/pigs", (req, res) => {

    let sql = "select * from Grisar"
    let params = []

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "Successfully imported database.",
            "pigs": rows
        })
    });
});

app.post("/pigs/", (req, res) => {

    let errors = [];

    if (!req.body.grisNamn)
        errors.push("No Name.");
    else if (!req.body.grisSort)
        errors.push("No Type.");
    else if (!req.body.grisLand)
        errors.push("No Origin Country.");
    else if (!req.body.grisPris)
        errors.push("No Price specified.");

    if (errors.length)
        console.log(errors);

    let data = {
        grisNamn: req.body.grisNamn,
        grisSort: req.body.grisSort,
        grisLand: req.body.grisLand,
        grisPris: req.body.grisPris,
        grisId: req.body.grisId
    }

    let sql = 'INSERT INTO Grisar (grisNamn, grisSort, grisLand, grisPris) VALUES (?,?,?,?)';
    let params = [data.grisNamn, data.grisSort, data.grisLand, data.grisPris, data.grisId];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "Successfully added entry to database.",
            "Added entry": data,
            "Id": this.lastID
        })
    });
})

app.delete("/pigs/:grisId", (req, res) => {

    db.run(
        'DELETE FROM Grisar WHERE grisId = ?',
        req.params.grisId,
        function (err) {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message": "Successfully removed entry.", rows: this.changes})
        });
});

app.get("/pigs/:grisId", (req, res) => {

    let sql = "SELECT * FROM Grisar WHERE grisId = ?"
    let params = [req.params.grisId]

    db.get(sql, params, (err, row) => {

        let object = JSON.stringify(row)

        if (object != null) {
            res.json({
                "pigs": row
            })
        } else {
            res.json("Could not find Id: " + req.params.grisId)
            res.end();

        }
    })
});

app.get("/", (req, res) => {

});


