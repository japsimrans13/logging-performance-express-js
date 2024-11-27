// app.js

const express = require("express");
const winston = require("winston");
const app = express();
const port = 3000;

// Configure winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

// 1 using console.log() to print 100 lines of text
// 2. using winston logger to print 100 lines of text

app.get("/console-log", (req, res) => {
  // 1. using console.log() to print 100 lines of text
//   calculate the time taken to execute the loop and send it as a response

const startTime = process.hrtime();
    for (let i = 0; i < 1000; i++) {
        console.log(`This is line ${i}`);
    }
    const endTime = process.hrtime(startTime);
    const timeTaken = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds
    res.json({
        time: timeTaken,
    });
});

app.get("/winston-log", (req, res) => {
  // 2. using winston logger to print 100 lines of text
//   calculate the time taken to execute the loop and send it as a response

const startTime = process.hrtime();
    for (let i = 0; i < 1000; i++) {
        logger.info(`This is line ${i}`);
    }
    const endTime = process.hrtime(startTime);
    const timeTaken = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds

    res.json({
        time: timeTaken,
    });
});

app.get("/", (req, res) => {
    for (let i = 0; i < 1000; i++) {
        //pass
    }
    const startTime = process.hrtime();
    const endTime = process.hrtime(startTime);
    const timeTaken = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds
    console.log(timeTaken, "time taken");
    res.json({
        time: timeTaken,
    });
})

// Start the server
app.listen(port, () => {
  logger.info(`Example app listening at http://localhost:${port}`);
});
