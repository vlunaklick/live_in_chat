import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import useErrorForms from '../hooks/useErrorForms'
import { useEffect } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Spinner from '../components/Spinner'

export default function Register(props) {
	const {
		userError,
		passwordError,
		mailError,
		registerSubmit,
		logged,
		register,
		setlogged,
		loading,
	} = useErrorForms()

	const router = useRouter()

	useEffect(() => {
		if (register) {
			router.push('/login')
		}
	}, [register])

	useEffect(() => {
		if (props.success) {
			router.push('/')
		}
	}, [])

	return (
		<div>
			<Head>
				<title>Live in Chat</title>
				<meta name='description' content='Chatting app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<RegisterWrapper>
				{props.success ? (
					<Spinner />
				) : (
					<section>
						<h2>Register - Register</h2>
						<form action='' method='post' onSubmit={registerSubmit}>
							<label>
								Username:
								<input type='text' required />
								{userError[0] ? <p>{userError[1]}</p> : ''}
							</label>
							<label>
								Mail:
								<input type='mail' required />
								{mailError[0] ? <p>{mailError[1]}</p> : ''}
							</label>
							<label>
								Password:
								<input type='password' required />
								{passwordError[0] ? <p>{passwordError[1]}</p> : ''}
							</label>
							<Link href='/login'>
								<a>Alredy have an account? Log in here.</a>
							</Link>
							<button type='submit' disabled={loading}>
								Register
							</button>
						</form>
					</section>
				)}
			</RegisterWrapper>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { res, req } = context

	const token = getCookie('session', { req, res })

	if (!token) {
		return { props: { success: false } }
	}

	const apiResponse = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/users/me`,
		{
			headers: { Authorization: `Bearer ${token}` },
			withCredentials: true,
		}
	)

	if (apiResponse.status === 200) {
		const props = { success: apiResponse.data.success }
		return { props: props }
	}

	return { props: { success: false } }
}

const RegisterWrapper = styled.main`
	background-color: #171717;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	section {
		padding: 1.25rem;
		width: 350px;
		background-color: #262626;
		border-radius: 0.5rem;
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px 0px rgba(0, 0, 0, 0.06);

		h2 {
			color: #fafafa;
			border-bottom: 1px solid #404040;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
		padding: 0.5rem 0;

		button {
			margin-top: 0.75rem;
			background-color: #1d4ed8;
			outline: none;
			border: none;
			cursor: pointer;
			padding: 0.625rem 1.25rem;
			border-radius: 0.5rem;
			color: #fafafa;
			font-size: 0.875rem;
			line-height: 1.25rem;
			transition: background-color 0.5s ease-in-out;
		}

		button:hover,
		button:active {
			background-color: #1e40af;
		}

		a {
			width: 100%;
			color: #38bdf8;
			font-size: 0.65rem;
			cursor: pointer;
		}

		a:hover {
			color: #0ea5e9;
		}

		label {
			color: #fafafa;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			width: 100%;

			input {
				width: 100%;
				outline: none;
				border: none;
				padding: 0.5rem;
				background-color: #404040;
				color: #fafafa;
				font-size: 0.7rem;
				border: 1px solid #525252;
				transition: border 0.5s ease-in-out;
			}

			input:focus {
				border: 1px solid #737373;
			}

			p {
				font-size: 0.6rem;
				color: #ef4444;
			}
		}
	}
`
