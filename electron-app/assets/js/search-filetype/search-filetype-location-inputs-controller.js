import { DIRECTORY_TO_SEARCH } from "./search-filetype.js"


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
  console.log('addInput')
  var newInputElement = document.createElement('input')
  newInputElement.classList.add('location-input')
  newInputElement.placeholder = "Type here a Location"
  newInputElement.type = "text"
  newInputElement.value = preWrittenLocation

  locationInputsWrapperDiv.appendChild(newInputElement)
  updateRemoveButtonVisibility()
}

function removeInput() {
  locationInputsWrapperDiv.removeChild(locationInputsWrapperDiv.lastChild);
  updateRemoveButtonVisibility()
}

function updateRemoveButtonVisibility() {
  let childElementCount = locationInputsWrapperDiv.childElementCount

  removelocationInputButton.style.display = childElementCount > 0 ? STYLE_DISPLAY_ATTRIBUTE_VISIBLE : STYLE_DISPLAY_ATTRIBUTE_INVISIBLE
}