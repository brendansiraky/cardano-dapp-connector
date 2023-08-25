// import { useDappConnector } from '../../../hooks/useDappConnector'
import { WalletInfoBanner } from '../WalletInfoBanner/WalletInfoBanner'
import { Donate } from '../Donate/Donate'
import styles from './Wallets.module.scss'

const WALLETS = ['nami', 'eternl', 'flint', 'gero']

export const Wallets = () => {
    // const {
    //     onWalletSelect,
    //     onWalletDisconnect,
    //     walletSelected,
    //     isLoading,
    //     walletValues,
    //     onSendTransaction
    // } = useDappConnector()

    function handleWalletClick(wallet: string) {
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