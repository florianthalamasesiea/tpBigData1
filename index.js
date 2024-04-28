const path = require('path');
const fs = require('fs');
const { Worker } = require('worker_threads');

let allFilesNames = [];

const nombreThread = Object.values(JSON.parse(fs.readFileSync('process.json', 'utf-8')))[0];

fs.readdir(path.join("C:\\Users\\flomm\\OneDrive\\Bureau\\NodePourTP\\output\\"), function (err, files) {
    if (err) {
        return console.log('Dossier introuvable : ' + err);
    } 
    files.forEach(function (file) {
        allFilesNames.push(file);
    });
    run(allFilesNames,nombreThread);
});

// LOGIQUE WORKER
    function chunkify(tousLesFichiers,n){
        let chunks = [];
        for (let i = n; i > 0; i--) {
            chunks.push(tousLesFichiers.splice(0, Math.ceil(tousLesFichiers.length / i)));
        }
        return chunks;
    }
    

    function run(tousLesFichiers, concurrentWorkers) {
        const chunks = chunkify(tousLesFichiers, concurrentWorkers);
        let workersCompleted = 0;
        console.time("Total opération");
    
        chunks.forEach((data, i) => {
            const worker = new Worker("./worker.js");
            worker.postMessage(data);
            worker.on("message", (msg) => {
                console.log(`Le worker ${i} a fini ses tâches.`);
                workersCompleted++;
                console.log(workersCompleted);
                if (workersCompleted == concurrentWorkers) {
                    console.timeEnd("Total opération");
                    console.log("Tous les workers ont fini leur tâches.");
                }
            });
        });
    }
// LOGIQUE WORKER
