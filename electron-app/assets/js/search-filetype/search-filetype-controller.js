import { printFoundWallet } from '../found-wallet/found-wallet.js'
import { FILE_EXTENSION_TO_FIND, BTC_WALLET_MAGIC_BYTES, DIRECTORY_TO_SEARCH } from './search-filetype.js'

const path = require('path')
const fs = require('fs')

var runSearchButton = null
var forceStopButton = null

export function initializeSearchElements() {
  // DOM Elements
  runSearchButton = document.querySelector('.search-button')
  forceStopButton = document.querySelector('.force-stop-button')

  // Prepare click Listeners
  runSearchButton.addEventListener('click', runSearch)
  // TODO: forceStopButton.addEventListener('click', stopSearch)
}

export function runSearch(e) {
  e.preventDefault()
  runFileExtensionSearch()
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

async function runFileExtensionSearch() {
  updateButtonsState(true)
  setTimeout(() => {
    fromDir(DIRECTORY_TO_SEARCH, FILE_EXTENSION_TO_FIND)
    updateButtonsState(false)
  }, 500)
}

function updateButtonsState(isSearchRunning) {
  if(isSearchRunning) {
    runSearchButton.classList.add('inactive')
    forceStopButton.classList.remove('inactive')
  } else {
    runSearchButton.classList.remove('inactive')
    forceStopButton.classList.add('inactive')
  }
}

async function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)){
      return;
  }

  fs.readdir(startPath, async (err, files) => {
    if(files) {
      for(var i = 0; i < files.length; i++) {
        var filename = path.join(startPath,files[i])
        var stat = fs.lstatSync(filename)
        if(stat.isDirectory()) {
          fromDir(filename, filter)
        }
        else if(filename.indexOf(filter)>=0) {
          checkMagicByteForFile(filename)
        };
      };
    }
  })
};