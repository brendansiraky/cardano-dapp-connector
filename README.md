# 🖥 cardano-dapp-connector 🖥

Cardano Dapp Connector with token validation.\
An example of the wallet connector standard [CIP30](https://cips.cardano.org/cips/cip30/) being implemented in order for a user to "connect" to the dapp via their Cardano wallet.

It implements the [CIP-0008](https://developers.cardano.org/docs/governance/cardano-improvement-proposals/cip-0008/) signing spec in order for a user to authenticate via signing a their Cardano Address. The signed address will be posted to the backend in order to validate. Typically this would go through some authentication process where the users details are saved into a database and a bearer token is returned. For this example, it is just returning the address that was signed showcasing it was successful.

Check out a live working demo of this [here](https://cardano-dapp-connector.vercel.app/).

Check out the repo for the backend here.

### Installation
```
npm install
```

### Start the project
```
npm start
```