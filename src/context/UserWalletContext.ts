import { Wallets } from '@/constants/wallets'
import { createContext } from 'react'

export type Wallet = {
    walletSelected: Wallets
    address: string
    balance: number
    network: string
}

type DefaultWallet = {
    wallet: Wallet | null
    setWallet: (wallet: Wallet) => void
    clearWallet: () => void
}

export const defaultWallet: DefaultWallet = {
    wallet: null,
    setWallet: (wallet: Wallet) => {},
    clearWallet: () => {},
}

export const UserWalletContext = createContext(defaultWallet)
