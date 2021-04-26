
const os = require('os');
const module = require('module')

export const FILE_EXTENSION_TO_FIND = '.dat'
export const BTC_WALLET_MAGIC_BYTES = '6231050009000000'
export const DIRECTORY_TO_SEARCH = process.platform == 'darwin' ? `${os.homedir()}/Library/Application\ Support` : `${os.homedir()}\Appdata` // based on source: https://en.bitcoin.it/wiki/Data_directory

// module.exports = {
//   FILE_EXTENSION_TO_FIND: '.dat',
//   BTC_WALLET_MAGIC_BYTES: '6231050009000000',
//   DIRECTORY_TO_SEARCH: process.platform == 'darwin' ? `${os.homedir()}/Library/Application\ Support` : `${os.homedir()}\Appdata` // based on source: https://en.bitcoin.it/wiki/Data_directory
// };