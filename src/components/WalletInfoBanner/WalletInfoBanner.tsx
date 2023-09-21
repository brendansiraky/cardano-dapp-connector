
import { Wallet } from '@/context/UserWalletContext'
import styles from './WalletInfoBanner.module.scss'

type WalletInfoBannerProps = {
    wallet: Wallet | null
}

export const WalletInfoBanner: React.FC<WalletInfoBannerProps> = ({
    wallet,
}) => {
    return (
        <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.connectedWalletWrapper}>
                    {wallet && (
                        <div
                            className={`${styles.walletIcon} ${
                                styles[wallet.walletSelected]
                            }`}
                        />
                    )}
                    <h4>
                        {wallet ? wallet.walletSelected : 'No Wallet Connected'}
                    </h4>
                    {wallet && <span>({wallet.network})</span>}
                </div>
                <div className={styles.balanceWrapper}>
                    <h1>{wallet ? wallet.balance.toFixed(2) : '0.00'} ₳</h1>
                </div>
            </div>
        </div>
    )
}
