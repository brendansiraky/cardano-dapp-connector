import { UserWalletContext } from '@/context/UserWalletContext'
import { useContext } from 'react'
import styles from './Disconnect.module.scss'

export const Disconnect = () => {
    const { clearWallet } = useContext(UserWalletContext)
    return (
        <div onClick={clearWallet} className={styles.wrapper}>
            <span>Disconnect</span>
        </div>
    )
}
