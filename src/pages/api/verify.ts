// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Web3Token from 'web3-cardano-token/dist/node'
import { nanoid } from 'nanoid'

type RequestBody = {
  	token: string
}

type RequestQuery = {
	address: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	if (req.method === 'GET') {
		const address = req.query.address;
		if (typeof address === 'string') {
			res.status(202).json({ address })
		}
		return
	}

	if (req.method === 'POST') {
		const requestBody: RequestBody = req.body;
		if (typeof requestBody.token === 'string') {

		}
		
		return
	}


	// const { address, body } = await Web3Token.verify(req.query.token);

}
