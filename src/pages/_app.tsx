import { useState } from 'react'
import type { AppProps } from 'next/app'
import {
    defaultWallet,
    UserWalletContext,
    Wallet,
} from '@/context/UserWalletContext'
import '../styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
    const [userWalletState, setUserWalletState] = useState(defaultWallet)

    function setWallet(walletValues: Wallet) {
        setUserWalletState((prev) => ({
            ...prev,
            wallet: walletValues,
        }))
    }

    function clearWallet() {
        setUserWalletState((prev) => ({ ...prev, wallet: null }))
    }

    return (
        <UserWalletContext.Provider
            value={{ ...userWalletState, setWallet, clearWallet }}
        >
            <Component {...pageProps} />
        </UserWalletContext.Provider>
    )
}
