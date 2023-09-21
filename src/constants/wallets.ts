export const WALLETS = ['nami', 'eternl', 'flint', 'gerowallet'] as const
export type Wallets = (typeof WALLETS)[number]
