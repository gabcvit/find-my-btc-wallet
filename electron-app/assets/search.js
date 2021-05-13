import { FILE_EXTENSION_TO_FIND, BTC_WALLET_MAGIC_BYTES, DIRECTORY_TO_SEARCH } from './constants.js'
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

var resultWrapper = null
var runSearchButton = null
var forceStopButton = null

export function initializeSearchElements() {
  // DOM Elements
  resultWrapper = document.querySelector('.result-wrapper')
  runSearchButton = document.querySelector('.search-button')
  forceStopButton = document.querySelector('.force-stop-button')

  // Prepare click Listeners
  runSearchButton.addEventListener('click', runSearch)
  forceStopButton.addEventListener('click', cleanLog)
}

function printIconInFoundWallet(foundWalletWrapperElement) {
  const btcIconImgElement = document.createElement("IMG")
  btcIconImgElement.src = "assets/img/btc_icon.png"
  btcIconImgElement.classList.add('found-wallet-icon')
  foundWalletWrapperElement.appendChild(btcIconImgElement)
  return foundWalletWrapperElement
}

function printTextNodesInFoundWallet(fileLocation, foundWalletWrapperElement) {
  const textNodesToAdd = [
    {text: 'BTC Wallet found!', classes: ['found-wallet-title']},
    {text: fileLocation,          classes: ['found-wallet-location']},
    {text: 'Click here to open',  classes: ['found-wallet-button', 'bg-space-gradient']},
  ]

  textNodesToAdd.forEach(singleTextNodeToAdd => {
    const textNome = document.createTextNode(singleTextNodeToAdd.text)
    const paragraph = document.createElement("P")
    paragraph.appendChild(textNome)
    singleTextNodeToAdd.classes.forEach(singleClass => {
      paragraph.classList.add(singleClass)
    })
    
    foundWalletWrapperElement.appendChild(paragraph)
  })

  return foundWalletWrapperElement
}

function printFoundWallet(fileLocation) {
  var foundWalletWrapperElement = document.createElement("div")
  foundWalletWrapperElement.classList.add('found-wallet-wrapper')
  foundWalletWrapperElement = printIconInFoundWallet(foundWalletWrapperElement)
  foundWalletWrapperElement = printTextNodesInFoundWallet(fileLocation, foundWalletWrapperElement)

  foundWalletWrapperElement.addEventListener('click', function() {
    openFileLocation(fileLocation)
  })

  resultWrapper.appendChild(foundWalletWrapperElement)
}

function openFileLocation(fileLocation) {
  console.log(fileLocation)
}

function printResult(data, isPositive = false) {
  const itemText = document.createTextNode(data)
  const paragraphElementToInsert = document.createElement("P")
  if(isPositive) {
    paragraphElementToInsert.classList.add('positive-text')
  }
  paragraphElementToInsert.appendChild(itemText)
  resultWrapper.appendChild(paragraphElementToInsert)
}

function cleanLog(e) {
  resultWrapper.innerHTML = ''
}

export function runSearch(e) {
  e.preventDefault()
  cleanLog(null)
  runFileExtensionSearch()
  //runPrivateKeyRegexSearch()
}

function checkMagicByteForFile(fileLocation) {
  fs.open(fileLocation, 'r', function(status, fd) {
    if (status) {
      // console.log(status.message);
      return;
    }
    var buffer = Buffer.alloc(50);
    fs.read(fd, buffer, 0, 50, 0, function(err, num) {
      if(buffer.includes(BTC_WALLET_MAGIC_BYTES, 0, "hex")) {
        printFoundWallet(fileLocation)
      }
    });
  });
}

function runFileExtensionSearch() {
  printResult('Searching for files with the extension "'+ FILE_EXTENSION_TO_FIND +'". Please wait...')
  fromDir(DIRECTORY_TO_SEARCH, FILE_EXTENSION_TO_FIND)
  printResult("Finishing search for file name")
}

function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)){
      // console.log("no directory", startPath);
      return;
  }

  try {
    var files = fs.readdirSync(startPath);
  } catch(e) {
    // console.log('customError', e)
  }

  if(files) {
    for(var i = 0; i < files.length; i++) {
      var filename = path.join(startPath,files[i]);
      var stat = fs.lstatSync(filename);
      if(stat.isDirectory()) {
        fromDir(filename,filter); //recursive search
      }
      else if(filename.indexOf(filter)>=0) {
        checkMagicByteForFile(filename)
        // console.log('-- found: ',filename);
      };
  };
  }
};

function runPrivateKeyRegexSearch() {
  const expressionToFind =  `${'"(\w{64})$"'}`
  const ls = spawn('grep', ['-r', expressionToFind, DIRECTORY_TO_SEARCH]);
  printResult("Searching for "+ expressionToFind +"... please wait")

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);

    data = "I found a 64 char long private key on a certain file located in: " + data + "\n\n, you might want to check if that file is a wallet file :)"
    printResult(data)
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  // code 0: Successful
  // code 1: didn't find anything
  ls.on('close', (code) => {
    if(code == 1) {
      printResult("Finished looking for 64 char long private keys, nothing was found yet")
    }
    console.log(`child process exited with code ${code}`);
  });
}