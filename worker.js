const fs = require('fs');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { parentPort } = require("worker_threads");

// Define entreprise schema
const entrepriseSchema = new Schema({
    siren: Number,
    nic: Number,
    siret: String,
    dateCreationEtablissement: Date,
    dateDernierTraitementEtablissement: String,
    typeVoieEtablissement: String,
    libelleVoieEtablissement: String,
    codePostalEtablissement: String,
    libelleCommuneEtablissement: String,
    codeCommuneEtablissement: String,
    dateDebut: Date,
    etatAdministratifEtablissement: String
});

// Create a Mongoose model based on the schema
const Entreprise = mongoose.model('Entreprise', entrepriseSchema);

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/tpFrance', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
        // Handle incoming CSV data
        parentPort.on('message', async (csvEntreprises) => {
            try {
                // Read CSV files and insert data
                for (const csvEntreprise of csvEntreprises) {
                    const fileData = fs.readFileSync('C:\\Users\\flomm\\OneDrive\\Bureau\\NodePourTP\\output\\' + csvEntreprise, 'utf-8');
                    const lines = fileData.split(/\r?\n/);
                    const entreprises = lines.map(line => line.split(','));

                    const entreprisesToInsert = [];
                    for (const donneesEntreprise of entreprises) {
                        if (donneesEntreprise[0] !== "siren") {
                            entreprisesToInsert.push({
                                siren: donneesEntreprise[0],
                                nic: donneesEntreprise[1],
                                siret: donneesEntreprise[2],
                                dateCreationEtablissement: donneesEntreprise[4],
                                dateDernierTraitementEtablissement: donneesEntreprise[8],
                                typeVoieEtablissement: donneesEntreprise[16],
                                libelleVoieEtablissement: donneesEntreprise[17],
                                codePostalEtablissement: donneesEntreprise[18],
                                libelleCommuneEtablissement: donneesEntreprise[19],
                                codeCommuneEtablissement: donneesEntreprise[22],
                                dateDebut: donneesEntreprise[44],
                                etatAdministratifEtablissement: donneesEntreprise[45]
                            });
                        }
                    }

                    await Entreprise.insertMany(entreprisesToInsert);
                    console.log('Objects inserted successfully:', entreprisesToInsert.length);
                }
            } catch (error) {
                console.error('Error processing CSV data:', error);
            } finally {
                // Notify the parent thread that processing is done
                parentPort.postMessage('done');
            }
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
