

document.body.addEventListener('click', (event) => {
  console.log('click', event)
  if (event.target.dataset.section) {
    handleSectionTrigger(event)
  } else if (event.target.dataset.modal) {
    handleModalTrigger(event)
  } else if (event.target.classList.contains('modal-hide')) {
    hideAllModals()
  }
})

function handleSectionTrigger (event) {
  hideAllSectionsAndDeselectButtons()

  // Highlight clicked button and show view
  event.target.classList.add('is-selected')

  // Display the current section
  const sectionId = `${event.target.dataset.section}-section`
  document.getElementById(sectionId).classList.add('is-shown')
}

function hideAllSectionsAndDeselectButtons () {
  const sections = document.querySelectorAll('.js-section.is-shown')
  console.log("hideAllSectionsAndDeselectButtons", sections)
  Array.prototype.forEach.call(sections, (section) => {
    console.log("forEach", section)
    section.classList.remove('is-shown')
  })

  const buttons = document.querySelectorAll('.nav-button.is-selected')
  Array.prototype.forEach.call(buttons, (button) => {
    button.classList.remove('is-selected')
  })
}