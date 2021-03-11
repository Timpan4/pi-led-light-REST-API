const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const Gpio = require('pigpio').Gpio;
const port = 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
    res.sendfile("index.html");
});

router.get('/update', (req, res) => {
    console.log(req.body);
    let rPin = new Gpio(req.body.rPin, { mode: Gpio.OUTPUT });;
    let gPin = new Gpio(req.body.gPin, { mode: Gpio.OUTPUT });;
    let bPin = new Gpio(req.body.pPin, { mode: Gpio.OUTPUT });;
    rPin.pwmWrite(req.body.red);
    gPin.pwmWrite(req.body.green);
    bPin.pwmWrite(req.body.blue);
    res.set('Content-Type', 'text/plain')
    res.send("hello i have recieve");
});

app.listen(port, () => {
    console.log("Started on PORT " + port);
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