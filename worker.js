var fs = require('fs');
const { connect, Schema, model } = require('mongoose');
const { log } = require("console");
 const {parentPort} = require("worker_threads");
 connect('mongodb://127.0.0.1:27017/tpFranceV2');

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

const Entreprise = model("Entreprise", entrepriseSchema);


const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(delimiter));

parentPort.on('message', (csvEntreprises) => {
  var listeNouvelleEntreprise = [];
    csvEntreprises.forEach(csvEntreprise => {
      if (listeNouvelleEntreprise.length > 50000) {
        console.log("test");
        Entreprise.create(listeNouvelleEntreprise);
        listeNouvelleEntreprise = [];
        console.log("test2");
      }

        var a = fs.readFileSync('C:\\Users\\flomm\\OneDrive\\Bureau\\NodePourTP\\output\\' + csvEntreprise, 'utf-8') ;
        var ensembleDocument = a.split(/\r?\n/);

        ensembleDocument.forEach(element => {
          let entreprises = CSVToArray(element);
          entreprises.forEach(donneesEntreprise => {
            if (donneesEntreprise[0] != "siren") {
              
                listeNouvelleEntreprise.push(Entreprise({ 
                  siren : donneesEntreprise[0], 
                  nic : donneesEntreprise[1], 
                  siret : donneesEntreprise[2], 
                  dateCreationEtablissement : donneesEntreprise[4], 
                  dateDernierTraitementEtablissement : donneesEntreprise[8], 
                  typeVoieEtablissement : donneesEntreprise[16], 
                  libelleVoieEtablissement : donneesEntreprise[17], 
                  codePostalEtablissement : donneesEntreprise[18], 
                  libelleCommuneEtablissement : donneesEntreprise[19], 
                  codeCommuneEtablissement : donneesEntreprise[22], 
                  dateDebut : donneesEntreprise[44],
                  etatAdministratifEtablissement : donneesEntreprise[45]
                }));
            };
          });
        });
      });
    console.log(listeNouvelleEntreprise.length);
});    
parentPort.postMessage('done');
