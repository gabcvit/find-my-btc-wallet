# find-my-btc-wallet

ALERT: This project is currently under development, it's not recommended for personal use it yet!

This app will be able to find long-lost BTC Wallets and keys that you might have lost in your computer. Built using electron and compatible with MacOS, Windows and Linux.

> The idea for this project came while browsing on reddit and coming accross [this post](https://www.reddit.com/r/BitcoinBeginners/comments/lzwvvr/i_mined_10_bitcoins_in_the_early_days). inspired by the comments and the nice solutions given for multiple platforms, I want to try to make a more user-friendly approach, and allow anyone to run a big and heavy grep function just by pressing a button!

This software will simply run a general search command (findstr / grep) in the machine looking for the expression "(\w{64})$", and give the user a good oversight of where it was able to find anything. This expression is because BTC wallet keys are saved as a 64 char long private key in the system's memory.

# What this app does
- ✅ Searches through your system and app files for files that might be a BTC wallet based on many different standards and directives which are useful to identify those files (such as BTC wallet "magic bytes", file extension, folders where wallet files are usually stores and so on)
- ✅ Gives you the address of the files identified as a BTC wallet
- ✅ Offers you a link to donate (any support is much appreciated)

# What this app DOESN'T do
- 🚫 Collects your data
- 🚫 Cracks the password to open your BTC Wallet
- 🚫 Reads any data about your BTC wallet
- 🚫 Collects any information about the files you have in your computer
- 🚫 Reads files from folders where it doesn't have the permission to do so
- 🚫 Charges you any kind of fees

# Relevant Links for research

Wallet recovery steps
https://walletrecovery.info/how-to-recover-your-corrupt-or-deleted-bitcoin-core-wallet/

Bitcoin default data directory
https://en.bitcoin.it/wiki/Data_directory

First mention of magic number wallet.dat file that I found
https://bitcointalk.org/index.php?topic=2612893.0

Magic number of wallet.dat files
https://bitcoin.stackexchange.com/questions/41447/filesystem-is-corrupt-how-to-find-wallet-dat/41450#41450