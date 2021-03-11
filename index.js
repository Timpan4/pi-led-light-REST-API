'use strict'

const express = require('express')
const bodyParser = require('body-parser')

// Create a new instance of express
const app = express()
const Gpio = require('pigpio').Gpio;
const port = 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router.get('/', (req, res) => {
//     res.sendfile("index.html");
// });

app.post('/update', function (req, res) {
    // console.log(req.body);
    // res.set('Content-Type', 'text/plain')
    res.send(JSON.stringify(req.body));
    let rPin = new Gpio(Number(req.body.rPin), { mode: Gpio.OUTPUT });
    let gPin = new Gpio(Number(req.body.gPin), { mode: Gpio.OUTPUT });
    let bPin = new Gpio(Number(req.body.pPin), { mode: Gpio.OUTPUT });
    rPin.pwmWrite(req.body.red);
    gPin.pwmWrite(req.body.green);
    bPin.pwmWrite(req.body.blue);
});

app.listen(port, (err) => {
    console.log("Started on PORT " + port);
    if (err) {
        throw err;
    }
})
// app.listen(3000, () => {
//     let rPin = new Gpio(5, { mode: Gpio.OUTPUT });;
//     rPin.pwmWrite(1);
//     console.log(rPin);
//     console.log("Server running on port 3000");
//     app.use(bodyParser.urlencoded({ extended: false }));
//     app.use(bodyParser.json());

//     app.post("/update", (req, res) => {
//     });
//     app.use("/", router);
// });