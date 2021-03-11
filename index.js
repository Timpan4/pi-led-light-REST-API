var express = require("express");
const bodyParser = require("body-parser");

const Gpio = require('pigpio').Gpio;
const router = express.Router();
var app = express();



app.listen(3000, () => {
    let rPin = new Gpio(5, { mode: Gpio.OUTPUT });;
    rPin.pwmWrite(255);
    console.log("Server running on port 3000");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post("/update", (req, res) => {
        console.log(req.body);
        let rPin = new Gpio(req.rPin, { mode: Gpio.OUTPUT });;
        let gPin = new Gpio(req.gPin, { mode: Gpio.OUTPUT });;
        let bPin = new Gpio(req.pPin, { mode: Gpio.OUTPUT });;
        rPin.pwmWrite(req.body.red);
        gPin.pwmWrite(req.body.green);
        bPin.pwmWrite(req.body.blue);
        res.sendStatus("hello i have recieve");
    });
    app.use("/", router);
});