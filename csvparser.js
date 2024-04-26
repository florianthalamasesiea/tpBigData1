const csvSplitStream = require('csv-split-stream');
var fs = require('fs');

return csvSplitStream.split(
  fs.createReadStream("C:\\Users\\flomm\\OneDrive\\Bureau\\NodePourTP\\StockEtablissement_utf8\\StockEtablissement_utf8.csv"),
  {
    lineLimit: 25000,
  },
  (index) => fs.createWriteStream('./output/tpsirene-'+(index) +'.csv')
)
.then(csvSplitResponse => {
  console.log('csvSplitStream succeeded.', csvSplitResponse);
}).catch(csvSplitError => {
  console.log('csvSplitStream failed!', csvSplitError);
});