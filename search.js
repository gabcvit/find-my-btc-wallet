const { spawn } = require('child_process');
var path = require('path'), fs=require('fs');

const mainLog = document.querySelector('.main-log')

function printResult(data, isPositive = false) {
  let newTextToAdd = data

  const itemText = document.createTextNode(newTextToAdd)
  const paragraphElementToInsert = document.createElement("P")

  if(isPositive) {
    paragraphElementToInsert.classList.add('positive-text')
  }

  paragraphElementToInsert.appendChild(itemText)
  mainLog.appendChild(paragraphElementToInsert)
}

const runSearchButton = document.querySelector('.run-search')
runSearchButton.addEventListener('click', runSearch)

const cleanLogButton = document.querySelector('.clean-log')
cleanLogButton.addEventListener('click', cleanLog)

function cleanLog(e) {
  mainLog.innerHTML = ''
}

function runSearch(e) {
  e.preventDefault()

  cleanLog(null)

  runFileNameSearch() // this function still needs to be finished before adding it to the search steps
  // runPrivateKeyRegexSearch()
}

function runFileNameSearch() {
  const fileNameToFind =  "wallet.dat"
  const defaultBitcoinAddress = process.platform == 'darwin' ? '/Users/gabriel/Library/Application\ Support/Bitcoin/' : 'C:\Users\YourUserName\Appdata\Roaming\Bitcoin (Vista and 7)' // based on source: https://en.bitcoin.it/wiki/Data_directory
  printResult('Searching for file with the name "'+ fileNameToFind +'". Please wait...')

  fromDir(defaultBitcoinAddress, fileNameToFind)

  printResult("Finishing search for file name")
}

function fromDir(startPath,filter) {
  if (!fs.existsSync(startPath)){
      console.log("no directory", startPath);
      return;
  }

  var files = fs.readdirSync(startPath);
  for(var i = 0; i < files.length; i++) {
      var filename = path.join(startPath,files[i]);
      var stat = fs.lstatSync(filename);
      if(stat.isDirectory()) {
        fromDir(filename,filter); //recursive search
      }
      else if(filename.indexOf(filter)>=0) {
        printResult("Found wallet.dat file!:" + filename, true)
        //console.log('-- found: ',filename);
      };
  };
};

function runPrivateKeyRegexSearch() {
  const expressionToFind =  `${'"(\w{64})$"'}`
  const defaultBitcoinAddress = process.platform == 'darwin' ? '/Users/gabriel/Library/Application Support/Bitcoin/' : 'C:\Users\YourUserName\Appdata\Roaming\Bitcoin (Vista and 7)' // based on source: https://en.bitcoin.it/wiki/Data_directory
  const ls = spawn('grep', ['-r', expressionToFind, defaultBitcoinAddress]);
  printResult("Searching for "+ expressionToFind +"... please wait")

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    data = "Yay! I found some files named " + expressionToFind + " on the following locations: \n\n" + data + "\n\n"
    printResult(data)
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    printResult(data)
  });

  // code 0: Successful
  // code 1: didn't find anything
  ls.on('close', (code) => {
    if(code == 1) {
      printResult("Uh-oh! I didn't find anything :(")
    }
    console.log(`child process exited with code ${code}`);
  });
}