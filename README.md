# find-my-btc-wallet
This app will be able to find long-lost BTC Wallets and keys that you might have lost in your computer. Built using electron and compatible with MacOS, Windows and Linux.

> The idea for this project came while browsing on reddit and coming accross [this post](https://www.reddit.com/r/BitcoinBeginners/comments/lzwvvr/i_mined_10_bitcoins_in_the_early_days). inspired by the comments and the nice solutions given for multiple platforms, I want to try to make a more user-friendly approach, and allow anyone to run a big and heavy grep function just by pressing a button!

This software will simply run a general search command (findstr / grep) in the machine looking for the expression "(\w{64})$", and give the user a good oversight of where it was able to find anything. This expression is because BTC wallet keys are saved as a 64 char long private key in the system's memory.

# Important Links

Wallet recovery steps
https://walletrecovery.info/how-to-recover-your-corrupt-or-deleted-bitcoin-core-wallet/

Bitcoin default data directory
https://en.bitcoin.it/wiki/Data_directory

First mention of magic number wallet.dat file that I found
https://bitcointalk.org/index.php?topic=2612893.0

Magic number of wallet.dat files
https://bitcoin.stackexchange.com/questions/41447/filesystem-is-corrupt-how-to-find-wallet-dat/41450#41450