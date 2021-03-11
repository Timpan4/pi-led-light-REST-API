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
    let pin = parseInt(req.body.rPin);

    let rPin = new Gpio(pin, { mode: Gpio.OUTPUT });
    // let gPin = new Gpio(String(req.body.gPin), { mode: Gpio.OUTPUT });
    // let bPin = new Gpio(String(req.body.pPin), { mode: Gpio.OUTPUT });

    rPin.pwmWrite(req.body.red);
    for (let tempBrightness = 0; tempBrightness <= brightness; tempBrightness++) {
        sleep(5);
    }
    while (brightness != 0) {
        brightness--;
        sleep(5);
    }
    // gPin.pwmWrite(req.body.green);
    // bPin.pwmWrite(req.body.blue);
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

function HSLToRGB(h, s, l) {

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
}
//sleep function
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}