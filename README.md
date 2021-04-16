# find-my-btc-wallet
This app will be able to find long-lost BTC Wallets and keys that you might have lost in your computer. Built using electron and compatible with MacOS, Windows and Linux.

> The idea for this project came while browsing on reddit and coming accross [this post](https://www.reddit.com/r/BitcoinBeginners/comments/lzwvvr/i_mined_10_bitcoins_in_the_early_days). inspired by the comments and the nice solutions given for multiple platforms, I want to try to make a more user-friendly approach, and allow anyone to run a big and heavy grep function just by pressing a button!

This software will simply run a general search command (findstr / grep) in the machine looking for the expression "(\w{64})$", and give the user a good oversight of where it was able to find anything. This expression is because BTC wallet keys are saved as a 64 char long private key in the system's memory.