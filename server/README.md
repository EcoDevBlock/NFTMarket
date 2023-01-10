npm i -g truffle
npm i -g ganache-cli

in a terminal run the command "ganache-cli"

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npm install
npm run compile
npm run deploy:token
```

Copy the address of the deployed token contract

1. cd migrations
   paste the address in 4_deploy_nft.js
2. cd ..
3. npm run deploy:nft

copy the address of the deployed nft and create a .env file
paste the address of the deployed nft as below

```
CONTRACT_MYNFT="0xC8E954e0b296d9d47E39f7055c8b359C5CF33DA3"
```

To the start the appliaction server, run "node server.js"
