require('dotenv').config()

const {
    REACT_APP_API_ENDPOINT,
    REACT_APP_MAINNET_ADDRESS,
    REACT_APP_TESTNET_ADDRESS,
} = process.env

export const config = {
    API_ENDPOINT: REACT_APP_API_ENDPOINT,
    MAINNET_ADDRESS: REACT_APP_MAINNET_ADDRESS,
    TESTNET_ADDRESS: REACT_APP_TESTNET_ADDRESS,
}