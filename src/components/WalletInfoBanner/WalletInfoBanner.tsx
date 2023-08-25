
import { lovelaceToAda } from '@/helpers/lovelaceToAda'
// import { getWalletSelected } from '../../../utility/walletHelpers'
import styles from './WalletInfoBanner.module.scss'

type WalletInfoBannerProps = {
    balance: number | null
    network: string | null
    walletIsConnected: boolean
}

export const WalletInfoBanner: React.FC<WalletInfoBannerProps> = ({ balance, network, walletIsConnected }) => {

    const walletSelected = ''

    return (
        <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.connectedWalletWrapper}>
                    {walletIsConnected && <div className={`${styles.walletIcon} ${styles[walletSelected]}`} />}
                    <h4>{walletIsConnected ? walletSelected : 'No Wallet Connected'}</h4>
                    {walletIsConnected && <span>({network})</span>}
                </div>
                <div className={styles.balanceWrapper}>
                    <h1>{walletIsConnected ? (lovelaceToAda(Number(balance))).toFixed(2) : '0.00'} ₳</h1>
                </div>
            </div>
        </div>
    )
}