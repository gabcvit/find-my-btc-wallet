
const {shell} = require('electron')

var resultWrapper = null

export function initializeResultWrapper () {
  resultWrapper = document.querySelector('.result-wrapper')
}

export function printFoundWallet (fileLocation) {
  var foundWalletWrapperElement = document.createElement("div")
  foundWalletWrapperElement.classList.add('found-wallet-wrapper')
  foundWalletWrapperElement = printIconInFoundWallet(foundWalletWrapperElement)
  foundWalletWrapperElement = printTextNodesInFoundWallet(fileLocation, foundWalletWrapperElement)

  foundWalletWrapperElement.addEventListener('click', function() {
    openFileLocation(fileLocation)
  })

  resultWrapper.appendChild(foundWalletWrapperElement)
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
    {text: 'BTC Wallet found!',  classes: ['found-wallet-title']},
    {text: fileLocation,         classes: ['found-wallet-location']},
    {text: 'Click here to open', classes: ['found-wallet-button', 'bg-space-gradient']},
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

function openFileLocation (fileLocation) {
  shell.showItemInFolder(fileLocation)
}