import { Wallets } from "@/components/Wallets/Wallets";

type APIErrorCode =  {
    InvalidRequest: -1,
    InternalError: -2,
    Refused: -3,
    AccountChange: -4,
}

type APIError = {
    code: keyof APIErrorCode,
    info: string
}
interface DataSignErrorCode {
    ProofGeneration: 1,
    AddressNotPK: 2,
    UserDeclined: 3,
}
type DataSignError = {
    code: DataSignErrorCode,
    info: string
}

interface EnabledWallet {
    getBalance: () => Promise<string | APIError>
    getChangeAddress: () => Promise<string | APIError>
    getNetworkId: () => Promise<number | APIError>
    getRewardAddresses: () => Promise<string[] | APIError>
    getUnusedAddresses: () => Promise<string[] | APIError>
    getUsedAddresses: () => Promise<string[] | APIError>
    getUtxos: () => Promise<string[] | APIError>
    signData: (addr: string, ) => Promise<DataSignError | APIError>
    signTx: () => void
    submitTx: () => void
}

interface Window {
    cardano?: {
        [k in Wallets]: {
            enable: () => Promise<APIError>
            isEnabled: () => Promise<APIError | boolean> 
        }
    },
    getBalance?: () => Promise
}