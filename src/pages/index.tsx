import { Banner } from '@/components/Banner/Banner'
import { Disconnect } from '@/components/Disconnect/Disconnect'
import { Wallets } from '@/components/Wallets/Wallets'
import { UserWalletContext } from '@/context/UserWalletContext'
import Head from 'next/head'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
    const { wallet } = useContext(UserWalletContext)
    return (
        <>
            <Head>
                <title>Cardano Dapp Connector</title>
                <meta
                    name="description"
                    content="Cardano DApp Connector: Sign and Authenticate User Addresses via CIP-0008"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Wallets />
            <Banner />
            {wallet && <Disconnect />}
            <ToastContainer />
        </>
    )
}
