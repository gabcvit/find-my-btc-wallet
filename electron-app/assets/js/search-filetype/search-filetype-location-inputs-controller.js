import { DIRECTORY_TO_SEARCH } from "./search-filetype.js"
const {dialog} = require('electron').remote;

const STYLE_DISPLAY_ATTRIBUTE_INVISIBLE = 'none'
const STYLE_DISPLAY_ATTRIBUTE_VISIBLE = 'inline'

var locationInputsWrapperDiv = null
var addlocationInputButton = null
var removelocationInputButton = null

export function initializeDOMElements() {
  // DOM Elements
  locationInputsWrapperDiv = document.querySelector('.input-locations-wrapper')
  addlocationInputButton = document.querySelector('.add-field-button')
  removelocationInputButton = document.querySelector('.remove-field-button')

  // Prepare click Listeners
  addlocationInputButton.addEventListener('click', addInput)
  removelocationInputButton.addEventListener('click', removeInput)

  setTimeout(() => {
    addInput(null, DIRECTORY_TO_SEARCH)
  }, 500)
  
}

function addInput(e, preWrittenLocation = '') {
  let newDivToAppend = createInputWrapperDiv()
  let responses = createAndAppendInputToDiv(newDivToAppend, preWrittenLocation)
  let newInputElement = responses.newInputElement
  newDivToAppend = responses.divElement
  
  newDivToAppend = createAndAppendButtonToDiv(newDivToAppend, newInputElement)
  appendNewDivToInputsWrapper(newDivToAppend)
  
  updateRemoveButtonVisibility()
}

function createInputWrapperDiv() {
  var newDivElement = document.createElement('div')
  newDivElement.classList.add('single-location-input-wrapper')

  return newDivElement
}

function createAndAppendInputToDiv(divElement, preWrittenLocation) {
  var newInputElement = document.createElement('input')
  newInputElement.classList.add('location-input')
  newInputElement.placeholder = "Type here a Location"
  newInputElement.value = preWrittenLocation

  divElement.appendChild(newInputElement)

  return {divElement, newInputElement}
}

function createAndAppendButtonToDiv(divElement, newInputElementReference) {
  var newButtonElement = document.createElement('button')
  newButtonElement.classList.add('location-input-button')
  newButtonElement.innerText = 'select location'

  newButtonElement.addEventListener(
    'click', 
    function() {
      selectLocationButtonWasPressed(newInputElementReference)
    },
    false)

  divElement.appendChild(newButtonElement)

  return divElement
}

function appendNewDivToInputsWrapper(divElement) {
  console.log('appendNewDivToInputsWrapper', divElement)
  locationInputsWrapperDiv.appendChild(divElement)
}

async function selectLocationButtonWasPressed(newInputElementReference) {
  var path = await dialog.showOpenDialog({
      properties: ['openDirectory']
  });

  if(path.filePaths.length > 0) {
    newInputElementReference.value = path.filePaths[0]
  }
}

function removeInput() {
  locationInputsWrapperDiv.removeChild(locationInputsWrapperDiv.lastChild);
  updateRemoveButtonVisibility()
}

function updateRemoveButtonVisibility() {
  let childElementCount = locationInputsWrapperDiv.childElementCount

  removelocationInputButton.style.display = childElementCount > 0 ? STYLE_DISPLAY_ATTRIBUTE_VISIBLE : STYLE_DISPLAY_ATTRIBUTE_INVISIBLE
}

export function getAllLocations() {
  let filteredLocations = []
   locationInputsWrapperDiv.childNodes.forEach(singleNode => {
    filteredLocations.push(singleNode.childNodes[0].value)
  })

  return filteredLocations
}