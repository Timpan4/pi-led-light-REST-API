var express = require("express");

const Gpio = require('pigpio').Gpio;
var app = express();




app.listen(3000, () => {
    console.log("Server running on port 3000");
});
app.post("/update", (req, res, next) => {
    let rPin = new Gpio(req.rPin, { mode: Gpio.OUTPUT });;
    let gPin = new Gpio(req.gPin, { mode: Gpio.OUTPUT });;
    let bPin = new Gpio(req.pPin, { mode: Gpio.OUTPUT });;
    rPin.pwmWrite(req.red);
    gPin.pwmWrite(req.green);
    bPin.pwmWrite(req.blue);
});