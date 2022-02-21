import styled from 'styled-components'
import { BsSearch } from 'react-icons/bs'

export default function SidebarSearch({ setShowChat, lastChats }) {
	const searchInput = e => {
		if (e.target.value === '') {
			setShowChat(lastChats)
		} else {
			let newChats = lastChats.filter(chat => {
				if (
					chat.creator.toLowerCase().includes(e.target.value.toLowerCase()) ||
					chat.email.toLowerCase().includes(e.target.value.toLowerCase())
				) {
					return chat
				}
			})
			setShowChat(newChats)
		}
	}

	return (
		<SearchWrapper>
			<div>
				<BsSearch className='svg' />
				<input
					type='text'
					placeholder='Search a chat'
					onChange={e => {
						searchInput(e)
					}}
				/>
			</div>
		</SearchWrapper>
	)
}

const SearchWrapper = styled.div`
	padding: 0.6rem 1.5rem;
	border-bottom: ${({ theme }) => theme.sidebar.border};

	div {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		background-color: ${({ theme }) => theme.chat.holder};
		padding: 0 0.5rem;
		border-radius: 0.5rem;

		.svg {
			cursor: pointer;
			color: #fafafa;
		}
	}

	input {
		padding: 0.3rem;
		width: 100%;
		border-radius: 15px;
		background-color: transparent;
		outline: none;
		border: none;
		color: #fafafa;
	}
`
