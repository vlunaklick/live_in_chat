import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getCookie } from 'cookies-next'
import axios from 'axios'

export default function DropdownChatHeader({
	setChatSelected,
	chatId,
	setLastChats,
	lastChats,
}) {
	const [open, setOpen] = useState(false)

	const deleteChat = async () => {
		const token = getCookie('session')

		if (chatId) {
			await axios
				.delete(`http://localhost:3005/chats/id/${chatId}`, {
					headers: { Authorization: `Bearer ${token}` },
					withCredentials: true,
				})
				.then(data => {
					try {
						const newArr = lastChats.map(chat => {
							return chat.chatId !== chatId ? chat : ''
						})

						let newArray = new Array()
						for (var i = 0, j = newArr.length; i < j; i++) {
							if (newArr[i]) {
								newArray.push(newArr[i])
							}
						}

						setLastChats(newArray)

						setChatSelected(false)
					} catch (err) {
						console.log(err)
					}
				})
		}
	}

	return (
		<WrapperDropdown onClick={() => setOpen(prevState => !prevState)}>
			<BsThreeDotsVertical className='dropdown-menu' />
			<DropdownStyle open={open}>
				<div onClick={deleteChat}>Delete chat</div>
				<div onClick={() => setChatSelected(false)}>Close chat</div>
			</DropdownStyle>
		</WrapperDropdown>
	)
}

const WrapperDropdown = styled.div`
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;

	.dropdown-menu {
		cursor: pointer;
		color: #fafafa;
		font-size: 1.2rem;
	}
`

const DropdownStyle = styled.div`
	position: absolute;
	top: 42px;
	right: 25px;
	width: 150px;
	transform: translate(-45%);
	overflow: hidden;
	background-color: #190627;
	border-radius: 4px;
	border-top-right-radius: 0;
	padding: 0.5rem 0;
	overflow: hidden;
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.14),
		0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
	transform: ${({ open }) => (open ? 'scale(1,1)' : 'scale(0,0)')};
	transform-origin: top right;
	transition: transform 0.2s ease-in;

	div {
		padding: 0.5rem 1rem;
		color: #fafafa;
		font-size: 0.9rem;
		transition: background-color 0.5s ease-in-out;
		cursor: pointer;
	}

	div:hover {
		background-color: #040106;
	}
`