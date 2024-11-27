# To demonstrate :"How console.log() can degrade your API performance"
### Main Objective is to know how console.log() can degrade your performance
# Secondary Objective is to get the performance difference between console.log() and winston logger
<!-- The experiment will be done in 3 parts: -->
    1 using console.log() to print 1000 lines of text
    2 using winston logger to print 1000 lines of text
    3 without any logs (just a for loop running 1000 times)


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