import { Value } from '@emurgo/cardano-serialization-lib-asmjs'
import { Buffer } from 'buffer'
import { lovelaceToAda } from './lovelaceToAda'

export function convertBalanceToAda(hexBalance: string) {
    const lovelace = Value.from_bytes(Buffer.from(hexBalance, 'hex'))
        .coin()
        .to_str()
    const ada = lovelaceToAda(lovelace)
    return ada
}
