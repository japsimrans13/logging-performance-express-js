<!-- To demonstrate :"How console.log() can degrade your performance" -->
# Main Objective is to know how console.log() can degrade your performance
# Secondary Objective is to get the performance difference between console.log() and winston logger
<!-- The experiment will be done in 2 go: -->
    1 using console.log() to print 100 lines of text
    2. using winston logger to print 100 lines of text

<!-- For both PM2 will be used on a MAC M1 machine -->

# Commands to run the experiment
```bash
# To run the console.log() experiment
npm run test:console

# To run the winston logger experiment
npm run test:winston

# To run without any logger
npm run test:noLog

```
<!-- The results will be shown in the console and save in xlsx file-->
# Results
Please refer to the results folder