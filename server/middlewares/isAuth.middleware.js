import jwt from 'jsonwebtoken'
import { getUser } from '../services/user.service.js'

export async function isAuth(req, res, next) {
	try {
		let { authorization } = req.headers

		try {
			authorization = authorization.split(' ')[1]
		} catch (error) {
			console.log(error)
		}

		if (!authorization) {
			return res.status(401).json({ success: false, message: 'Not logged in' })
		}

		const authorizationValid = jwt.verify(authorization, process.env.JWT_SECRET)

		const user = await getUser(authorizationValid.email)

		req.user = user

		if (!authorizationValid) {
			return res
				.status(403)
				.json({ success: false, message: 'Session has expired' })
		}

		next()
	} catch (err) {
		res.status(500).json({ success: false, message: err.message })
	}
}
