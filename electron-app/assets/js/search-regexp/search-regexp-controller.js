const { spawn } = require('child_process')

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