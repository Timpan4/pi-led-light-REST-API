var express = require("express");
const bodyParser = require("body-parser");

const Gpio = require('pigpio').Gpio;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());







app.post("/update", (req, res) => {
    let rPin = new Gpio(req.rPin, { mode: Gpio.OUTPUT });;
    let gPin = new Gpio(req.gPin, { mode: Gpio.OUTPUT });;
    let bPin = new Gpio(req.pPin, { mode: Gpio.OUTPUT });;
    console.log(req.body);
    rPin.pwmWrite(req.body.red);
    gPin.pwmWrite(req.body.green);
    bPin.pwmWrite(req.body.blue);
    res.sendStatus("hello i have recieve");
});
app.use("/", router);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});