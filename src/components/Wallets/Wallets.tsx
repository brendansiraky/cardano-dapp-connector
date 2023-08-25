// import { useDappConnector } from '../../../hooks/useDappConnector'
import { WalletInfoBanner } from '../WalletInfoBanner/WalletInfoBanner'
import { Donate } from '../Donate/Donate'
import styles from './Wallets.module.scss'
import Web3Token from 'web3-cardano-token/dist/browser'
// import Web3TokenNode from 'web3-cardano-token/dist/node'

import { useLocalStorage } from 'usehooks-ts'
import { useEffect } from 'react'

import { Value } from '@emurgo/cardano-serialization-lib-asmjs'
import { Buffer } from 'buffer'
import { lovelaceToAda } from '@/helpers/lovelaceToAda'
import { stringToHex } from '@/helpers/stringToHex'

export const WALLETS = ['nami', 'eternl', 'flint', 'gero'] as const
export type Wallets = typeof WALLETS[number]
 
const useDappConnector = () => {

}


export const Wallets = () => {
    const [walletSelected, setWalletSelected] = useLocalStorage('walletSelected', '')

    
    useEffect(() => {

    }, [])
    // const {
    //     onWalletSelect,
    //     onWalletDisconnect,
    //     walletSelected,
    //     isLoading,
    //     walletValues,
    //     onSendTransaction
    // } = useDappConnector()

    // 230152708

    function convertBalanceToAda(hexBalance: string) {
        const lovelace = Value.from_bytes(Buffer.from(hexBalance, "hex")).coin().to_str()
        const ada = lovelaceToAda(lovelace)
        return ada
    }

    async function handleWalletClick(wallet: Wallets) {

        // const adaBalance = await enabledWallet.getBalance().then(convertBalanceToAda)
        
        try {
            // Ask user to enable wallet
            const enabledWallet = await window.cardano[wallet].enable()

            // get address from which we will sign message
            const address = (await enabledWallet.getUsedAddresses())[0];
    
            // check if we are already verified
            const response = await fetch(`/api/verify?address=${address}`)
            const result = await response.json()

            return
            
            // generating a token with 1 day of expiration time
            const token = await Web3Token.sign(() => {
                return enabledWallet.signData(address, stringToHex('Please sign this message to verify your identity.'))
            }, '7d', { nonce: 'nonce goes here' })
    
            console.log(token)

    
            // console.log({token})
            fetch(`/api/verify`, {
                method: 'POST',
                body: JSON.stringify({ token })
            }).then(r => r.json()).then(console.log)
        } catch (error) {
            console.log({error})
        }


        // if (walletSelected === wallet) {
        //     // onWalletDisconnect()
        // } else {
        //     onWalletSelect(wallet)
        // }
    }

    // const walletIsConnected = !isLoading && walletSelected
    const walletIsConnected = false
    const walletValues = {
        address: null,
        balance: null,
        network: null,
        walletEnabled: false,
    }

    return (
        <>
            <div className={styles.walletsWrapper}>
                <WalletInfoBanner walletIsConnected={walletIsConnected} {...walletValues} />
                <div className={styles.walletButtonsWrapper}>
                    {WALLETS.map(wallet => (
                        <div key={wallet}>
                            <Wallet 
                                wallet={wallet}
                                onClick={() => handleWalletClick(wallet)}
                                // isLoading={isLoading && walletSelected === wallet}
                                // isConnected={!isLoading && walletSelected === wallet}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* {walletIsConnected && <Donate onDonate={onSendTransaction} />} */}
        </>
    )
}


type WalletProps = {
    wallet: string
    onClick: () => void
    isLoading?: boolean
    isConnected?: boolean
}

const Wallet: React.FC<WalletProps> = ({ wallet, onClick, isLoading, isConnected }) => {
    return (
        <div
            onClick={onClick} 
            className={`${styles.walletWrapper} ${styles[wallet]} ${isLoading ? styles.loading : isConnected ? styles.connected : null}`}>
        </div>
    )
}