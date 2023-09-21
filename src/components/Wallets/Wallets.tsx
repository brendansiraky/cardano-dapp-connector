import { useContext } from 'react'
import { toast } from 'react-toastify'
import { WalletInfoBanner } from '../WalletInfoBanner/WalletInfoBanner'
import { stringToHex } from '@/helpers/stringToHex'
import { UserWalletContext } from '@/context/UserWalletContext'
import { convertBalanceToAda } from '@/helpers/convertBalanceToAda'
import { WALLETS, Wallets as WalletsNames } from '@/constants/wallets'
import styles from './Wallets.module.scss'
const Web3Token = require('web3-cardano-token/dist/browser')

export const Wallets = () => {
    const { wallet, setWallet } = useContext(UserWalletContext)

    async function handleWalletClick(wallet: WalletsNames) {
        try {
            // Try to get the wallet object that the user is selecting
            const walletObject = window.cardano && window.cardano[wallet]

            // If it doesn't exist, we need to throw as error
            if (!walletObject) throw { info: 'Could not enable wallet' }

            // Ask user to enable wallet
            const enabledWallet = await walletObject.enable()

            // get address from which we will sign message
            const address = await enabledWallet.getChangeAddress()

            const token = await Web3Token.sign(() => {
                return enabledWallet.signData(
                    address,
                    stringToHex(
                        'Please sign this message to verify your identity.'
                    )
                )
            }, '7d')

            const response = await fetch(`api/authenticate`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            })

            const result = await response.json()
            if (response.status !== 200) throw { info: result.message }

            const balance = await enabledWallet
                .getBalance()
                .then(convertBalanceToAda)

            //@ts-ignore
            const networkId = await window.cardano?.getNetworkId()
            const network = networkId === 1 ? 'mainnet' : 'testnet'

            // All good and we can set the details of the wallet
            setWallet({
                address: result.address,
                balance,
                walletSelected: wallet,
                network,
            })

            toast.success('Successfully authenticated wallet')
        } catch (err) {
            const error = err as { code: number; info: string }
            toast.error(error.info || 'Something went wrong')
        }
    }

    return (
        <>
            <div className={styles.walletsWrapper}>
                <WalletInfoBanner wallet={wallet} />
                <div className={styles.walletButtonsWrapper}>
                    {WALLETS.map((wallet) => (
                        <div key={wallet}>
                            <Wallet
                                wallet={wallet}
                                onClick={() => handleWalletClick(wallet)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

type WalletProps = {
    wallet: string
    onClick: () => void
    isLoading?: boolean
    isConnected?: boolean
}

const Wallet: React.FC<WalletProps> = ({
    wallet,
    onClick,
    isLoading,
    isConnected,
}) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.walletWrapper} ${styles[wallet]} ${
                isLoading
                    ? styles.loading
                    : isConnected
                    ? styles.connected
                    : null
            }`}
        ></div>
    )
}
