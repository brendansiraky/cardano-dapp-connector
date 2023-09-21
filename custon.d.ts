import { Wallets } from '@/constants/wallets'

type APIErrorCode = {
    InvalidRequest: -1
    InternalError: -2
    Refused: -3
    AccountChange: -4
}

interface DataSignErrorCode {
    ProofGeneration: 1
    AddressNotPK: 2
    UserDeclined: 3
}

type DataSignError = {
    code: DataSignErrorCode
    info: string
}

type EnabledWallet = {
    getBalance: () => Promise<string>
    getChangeAddress: () => Promise<string>
    getRewardAddresses: () => Promise<string[]>
    getUnusedAddresses: () => Promise<string[]>
    getUsedAddresses: () => Promise<string[]>
    getUtxos: () => Promise<string[]>
    signData: (addr: string, msg: string) => Promise<DataSignError>
    signTx: () => void
    submitTx: () => void
}

declare global {
    interface Window {
        cardano?: {
            [k in Wallets]: {
                enable: () => Promise<EnabledWallet>
            }
        }
    }
}

// Extend the Window interface with the getNetworkId property
declare global {
    interface Window {
        cardano?: {
            getNetworkId: () => Promise<0 | 1>
        }
    }
}
