// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const Web3Token = require('web3-cardano-token/dist/node')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            // We grab the signed token from the body that should have been passed through with the request
            const { token } = req.body

            // Check if the token is contained
            if (!token) {
                return res
                    .status(401)
                    .json({ message: 'Token was not present in the payload' })
            }

            // Grab the address that the token was signed with if verified successfully
            const { address } = await Web3Token.verify(token)

            /*
                Here we could add some additional signing of the address to produce a bearer token
                This could be saved in a users table in a database.
                Everytime the user wants to access an authenticated endpoint, they would have to pass through the bearer token.
            */

            // Instead we just return the address that the token was signed with
            return res.status(200).json({ address })
        } catch (error) {
            return res.status(400).json({ message: 'Unable to verify token' })
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' })
    }
}
