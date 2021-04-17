const { spawn } = require('child_process');

const resultWrapper = document.querySelector('.result-wrapper')
function printResult(data) {
const itemText = document.createTextNode(data)
resultWrapper.appendChild(itemText)
}

const runSearchButton = document.querySelector('.run-search')
runSearchButton.addEventListener('click', runSearch)

const cleanLogButton = document.querySelector('.clean-log')
cleanLogButton.addEventListener('click', cleanLog)

function cleanLog(e) {
resultWrapper.innerHTML = ''
}

function runSearch(e) {
  e.preventDefault()

  const expressionToFind = "banana"
  const ls = spawn('grep', ['-r', expressionToFind, '/Users/gabriel/Desktop']);
  printResult("Searching for "+ expressionToFind +"... please wait")

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    cleanLog(null)

    data = "Yay! I found the value " + expressionToFind + " on the following files: \n\n" + data
    printResult(data)
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    cleanLog(null)
    printResult(data)
  });

  // code 0: Successful
  // code 1: didn't find anything
  ls.on('close', (code) => {
    if(code == 1) {
      cleanLog(null)
      printResult("Uh-oh! I didn't find anything :(")
    }
    console.log(`child process exited with code ${code}`);
  });
}