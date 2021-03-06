import {
	createUser,
	checkAccount,
	accountId,
} from '../services/user.service.js'
import jwt from 'jsonwebtoken'

class UserController {
	create = async (req, res) => {
		const { user, email, password } = req.body

		const resolution = await createUser(user, email, password)

		if (resolution[0]) {
			res.status(200).json({ success: true, message: resolution[1] })
		} else {
			res.status(401).json({ success: false, message: resolution[1] })
		}
	}

	login = async (req, res) => {
		const { email, password } = req.body

		const resolution = await checkAccount(email, password)

		if (resolution[0]) {
			const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
				expiresIn: '1d',
			})

			res
				.status(200)
				.header({
					Authorization: `Bearer ${token}`,
				})
				.json({
					success: true,
					message: resolution[1],
					source: 'none',
				})
		} else {
			res
				.status(401)
				.json({ success: false, message: resolution[1], source: resolution[2] })
		}
	}

	user = async (req, res) => {
		const { user } = req

		res.status(200).json({ success: true, user: user })
	}
}

const controller = new UserController()
export { controller as UserController }
