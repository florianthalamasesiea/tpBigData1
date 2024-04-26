const path = require('path');
const fs = require('fs');
const { Worker } = require('worker_threads');

let allFilesNames = [];

fs.readdir(path.join("C:\\Users\\flomm\\OneDrive\\Bureau\\NodePourTP\\output\\"), function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        allFilesNames.push(file);
    });
    run(allFilesNames,4);// 2 = NOMBRE DE THREAD
});

// LOGIQUE WORKER TOUSSA TOUSSAa
    function chunkify(tousLesFichiers,n){
        let chunks = [];
        for (let i = n; i > 0; i--) {
            chunks.push(tousLesFichiers.splice(0, Math.ceil(tousLesFichiers.length / i)));
        }
        return chunks;
    }
    
    function run(tousLesFichiers, concurrentWorkers){
        const chunks = chunkify(tousLesFichiers,concurrentWorkers);
        chunks.forEach((data, i) => { // i = le chunk //data = les données
            const worker = new Worker("./worker.js");
            worker.postMessage(data);
            worker.on("done", () => {
                console.log(i + "Fichier " + data + " validé");
            });
        });
    }
// LOGIQUE WORKER TOUSSA TOUSSA