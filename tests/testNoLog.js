// testConsoleLog.js

const axios = require('axios');
const XLSX = require('xlsx');

const url = 'http://localhost:3000/';
const batchSize = 200;
const batchCount = 10;
let TotalSuccessFulRequestCount = 0;

// Helper function to send an individual request
async function sendRequest() {
    try {
        const response = await axios.get(url);
        TotalSuccessFulRequestCount++;
        return response.data.time; // Extract and return the time from the response
    } catch (error) {
        return null; // Return null if the request fails
    }
}


// Function to handle concurrent requests in batches
async function runConcurrentBatchRequests() {
    const type = 'Concurrent';
    const results = [];

    for (let batch = 0; batch < batchCount; batch++) {
        const promises = [];
        for (let i = 0; i < batchSize; i++) {
            promises.push(sendRequest());
        }

        const times = await Promise.all(promises);
        const successfulRequestCount = times.filter(time => time !== null).length;
        const batchTimeTaken = times.reduce((a, b) => a + b, 0);
        const averageTime = (batchTimeTaken / successfulRequestCount)

        results.push({ type, batch, averageTime });
        console.log(`Batch ${batch + 1}/${batchCount} - ${type}: ${averageTime} ms`);
    }

    // Calculate the final average time
    let totalTime = results.reduce((a, b) => a + parseFloat(b.averageTime), 0);
    const finalAverageTime = (totalTime / batchCount)
    results.push({ type: `Final ${type} Average`, averageTime: finalAverageTime });
    console.log(`Final ${type} Average: ${finalAverageTime} ms`);
    return results;
}

// Function to handle non-concurrent requests in batches
async function runNonConcurrentBatchRequests() {
    const type = 'Non-concurrent';
    const results = [];

    for (let batch = 0; batch < batchCount; batch++) {
        const times = [];
        for (let i = 0; i < batchSize; i++) {
            try {
                const time = await sendRequest();
                times.push(time);
            } catch (error) {
                console.error('Error during non-concurrent request:', error);
                times.push(null);
            }
        }
        const successfulRequestCount = times.filter(time => time !== null).length;
        const batchTimeTaken = times.reduce((a, b) => a + b, 0);
        const averageTime = (batchTimeTaken / successfulRequestCount)

        results.push({ type, batch, averageTime });
        console.log(`Batch ${batch + 1}/${batchCount} - ${type}: ${averageTime} ms`);
    }

    // Calculate the final average time
    let totalTime = results.reduce((a, b) => a + parseFloat(b.averageTime), 0);
    const finalAverageTime = (totalTime / batchCount)
    results.push({ type: `Final ${type} Average`, averageTime: finalAverageTime });
    console.log(`Final ${type} Average: ${finalAverageTime} ms`);
    return results;
}

// Function to write results to Excel
function writeResultsToExcel(concurrentResults, nonConcurrentResults) {
    const wb = XLSX.utils.book_new();

    // Add concurrent results to the first sheet
    const concurrentSheet = XLSX.utils.json_to_sheet(concurrentResults);
    XLSX.utils.book_append_sheet(wb, concurrentSheet, 'Concurrent');

    // Add non-concurrent results to the second sheet
    const nonConcurrentSheet = XLSX.utils.json_to_sheet(nonConcurrentResults);
    XLSX.utils.book_append_sheet(wb, nonConcurrentSheet, 'Non-concurrent');

    // Write the file to disk
    XLSX.writeFile(wb, 'results/no-results.xlsx');
    console.log('Results saved to console-log-results.xlsx');
}

// Main function to run the tests
async function runTests() {
    const concurrentResults = await runConcurrentBatchRequests();
    const nonConcurrentResults = await runNonConcurrentBatchRequests();
    writeResultsToExcel(concurrentResults, nonConcurrentResults);
}

runTests().catch(error => {
    console.error('Error during test execution:', error);
});
